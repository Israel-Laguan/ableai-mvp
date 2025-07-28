import { faker } from '@faker-js/faker';

import type {
  FakeBuyer,
  FakeGigWork,
  FakeGigWorkInput,
  FakeGigWorkTeam,
  FakePrivateDataUser,
  FakeRecommendation,
  FakeRecommendationInput,
  FakeReview,
  FakeReviewInput,
  FakerUserInput,
  FakeWorkerSkill,
  FakeSkillHire,
  FakeSkillHireInput,
  FakeWorkerSkillInput,
  FakeSlot,
  FakeSlotInput,
  FakeUser,
  FakeUserData,
  FakeWorker,
  FakeGigWorkTeamInput,
  GenerateFakeWorkersInput,
} from '../../interfaces';

import { Constants } from '@models/gig';
import { APP_ROLE } from '@models/shared';
import { repositories } from '../../dependency-injection';

const {
  buyerRepository,
  gigWorkTeamsRepository,
  gigWorksRepository,
  privateDataUserRepository,
  recommendationsRepository,
  reviewsRepository,
  skillHiresRepository,
  workerSkillsRepository,
  slotsRepository,
  userRepository,
  workerRepository,
} = repositories;

const FAKE_BADGES = ['Top Performer', 'Outstanding Contributor', 'Innovation Award'];
const FAKE_EQUIPMENT = [
  'Cocktail Shaker',
  'POS Terminal',
  'Serving Tray',
  'Wine Opener',
  'Coffee Machine',
  'Apron',
  'Bar Spoon',
  'Ice Bucket',
  'Glassware',
  'Order Pad',
  'Bottle Opener',
  'Uniform',
  'Espresso Machine',
  'Wine Glass',
  'Cutlery Set',
  'Luggage Cart',
  'Security Radio',
];
const FAKE_SKILLS = [
  'Bartender',
  'Waitstaff',
  'Barista',
  'Sommelier',
  'Host',
  `Maitre d'hotel`,
  'Banquet Server',
  'Mixologist',
  'Hotel Receptionist',
  'Concierge',
  'Event Coordinator',
  'Porter',
  'Doorman',
  'Usher',
  'Banquet Captain',
  'Front Office Manager',
  'Night Auditor',
  'Box Office Attendant',
  'Security Guard',
];

const GigWorkTeamStatus = Object.values(Constants.GIG_WORK_TEAM_STATUS);

export const fakerService = {
  generateFakeUserData: async ({ buyer, privateDataUser, user, worker }: FakeUserData = {}) => {
    let fakeUser = user as unknown as { id: number };
    let fakePrivateDataUser = {};

    if (!user) {
      const [newFakePrivateDataUser] = await fakerService.generateFakePrivateDataUser(
        privateDataUser
      );

      fakePrivateDataUser = newFakePrivateDataUser;

      const [newFakeUser] = await fakerService.generateFakeUser({
        ...user,
        privateDataUserId: newFakePrivateDataUser.id,
      });

      fakeUser = newFakeUser;
    }

    const fakeBuyer = await fakerService.generateFakeBuyer({
      ...buyer,
      userId: fakeUser.id,
    });

    const fakeWorkerOutput = await fakerService.generateFakeWorker({
      ...worker,
      userId: fakeUser.id,
    });

    const [gigWork] = await fakerService.generateFakeGigWork({
      buyerId: fakeBuyer.id,
      address: fakeBuyer.businessAddress,
    });

    const [skillHire] = await fakerService.generateFakeSkillHire({
      buyerId: fakeBuyer.id,
    });

    const gigWorkTeam = await fakerService.generateFakeGigWorkTeam({
      gigWorkId: gigWork.id,
      workerId: fakeWorkerOutput.worker.id,
      workerSkillId: fakeWorkerOutput.workerSkills[0].id,
    });

    const [review] = await fakerService.generateFakeReview({
      userId: fakeUser.id,
    });

    return {
      buyer: fakeBuyer,
      gigWork,
      gigWorkTeam,
      privateDataUser: fakePrivateDataUser,
      review,
      skillHire,
      workerSkill: fakeWorkerOutput.workerSkills[0],
      slot: fakeWorkerOutput.slots[0],
      user: fakeUser,
      worker: fakeWorkerOutput,
    };
  },

  generateFakeWorkerData: async () => {
    const [fakePrivateDataUser] = await fakerService.generateFakePrivateDataUser();
    const [fakeUser] = await fakerService.generateFakeUser({
      privateDataUserId: fakePrivateDataUser.id,
    });
    await fakerService.generateFakeWorker({
      userId: fakeUser.id,
    });

    return fakeUser.id;
  },

  generateFakeWorkers: async (input: GenerateFakeWorkersInput) => {
    const { limit = 1 } = input;
    const queries = Array.from({ length: limit }).map(() => fakerService.generateFakeWorkerData);
    const results = await Promise.allSettled(queries.map(fn => fn()));
    return results.filter(result => result.status === 'fulfilled').map(result => result.value);
  },

  removeFakeUserData: async (userId: string) => {
    await userRepository.deleteById(userId);
  },

  generateFakeBuyer: async (input: FakeBuyer) => {
    return await buyerRepository.create({
      badgesAwarded: String(faker.helpers.arrayElements(FAKE_BADGES, { min: 1, max: 3 })),
      businessAddress: faker.location.streetAddress(),
      businessName: faker.company.name(),
      businessRegistrationNumber: faker.string.alphanumeric(10),
      businessRole: faker.person.jobTitle(),
      representativeId: faker.string.uuid(),
      responseRate: faker.number.int({ min: 0, max: 100 }),
      socialNetworkUrl: faker.internet.url(),
      wouldWork: faker.number.int({ min: 0, max: 100 }),
      videoUrl: faker.internet.url(),
      ...input,
    });
  },

  generateFakePrivateDataUser: async (input?: FakePrivateDataUser) => {
    const fakePrivateDataUser: FakePrivateDataUser = {
      address: faker.location.streetAddress(),
      kycUrl: faker.internet.url(),
      latitude: faker.location.latitude({ min: 51.4, max: 51.55 }),
      longitude: faker.location.longitude({ min: -0.25, max: 0.05 }),
      phoneNumber: faker.phone.number(),
      rwtUrl: faker.internet.url(),
      ...input,
    };

    return await privateDataUserRepository.create(fakePrivateDataUser);
  },

  generateFakeUser: async (input: FakerUserInput) => {
    const fakeUser: FakeUser = {
      isBuyerAllowed: faker.datatype.boolean(),
      isKycApproved: faker.datatype.boolean(),
      isPublicProfile: faker.datatype.boolean(),
      isRtwApproved: faker.datatype.boolean(),
      isWorkerAllowed: faker.datatype.boolean(),
      roleId: 1,
      uid: faker.string.uuid(),
      withoutPrivateData: false,
      socialMediaUrl: faker.internet.url(),
      ...input,
    };

    return await userRepository.create(fakeUser);
  },

  generateFakeWorker: async (input: FakeWorker) => {
    return await workerRepository.registerWorker({
      worker: {
        socialNetworkUrl: faker.internet.url(),
        tags: String(faker.helpers.arrayElements(FAKE_SKILLS, { min: 1, max: 3 })),
        userId: input.userId,
      },
      recommendations: [
        {
          isExternal: true,
          name: faker.person.fullName(),
          recommendation: faker.lorem.paragraph(),
        },
      ],
      workerSkills: [
        {
          name: faker.helpers.arrayElement(FAKE_SKILLS),
          ratePerHour: faker.number.int({ min: 10, max: 100 }),
          summary: faker.lorem.sentence(),
          trainingDescription: faker.lorem.paragraph(),
          videoUrl: faker.internet.url(),
          equipment: faker.helpers.arrayElements(FAKE_EQUIPMENT, { min: 1, max: 2 }).join(', '),
          imagesUrl: faker.image.url(),
        },
      ],
      slots: [
        {
          startTime: faker.date.recent(),
          endTime: faker.date.future(),
        },
      ],
    });
  },

  generateFakeGigWork: async (input: FakeGigWorkInput) => {
    const fakeGigWork: FakeGigWork = {
      address: faker.location.streetAddress(),
      description: faker.lorem.paragraph(),
      endDate: faker.date.future(),
      startDate: faker.date.recent(),
      title: faker.lorem.sentence(),
      skills: faker.helpers.arrayElements(FAKE_SKILLS, { min: 1, max: 3 }).join(','),
      latitude: faker.location.latitude({ min: 51.4, max: 51.55 }),
      longitude: faker.location.longitude({ min: -0.25, max: 0.05 }),
      paymentPerHour: faker.number.int({ min: 10, max: 100 }),
      ...input,
    };

    return await gigWorksRepository.create(fakeGigWork);
  },

  generateFakeGigWorkTeam: async (input: FakeGigWorkTeamInput) => {
    const fakeGigWorkTeam: FakeGigWorkTeam = {
      awardedBadge: faker.helpers.arrayElement(FAKE_BADGES),
      endDateOffer: faker.date.future(),
      endGig: faker.datatype.boolean(),
      feedback: faker.lorem.sentence(),
      isAcceptedOffer: faker.datatype.boolean(),
      paymentId: faker.number.int({ min: 1, max: 1000 }),
      expenses: faker.number.int({ min: 0, max: 100 }),
      status: faker.helpers.arrayElement(GigWorkTeamStatus),
      tips: faker.number.int({ min: 0, max: 100 }),
      totalPayment: faker.number.int({ min: 10, max: 1000 }),
      workTime: faker.number.int({ min: 1, max: 100 }),
      wouldWork: faker.datatype.boolean(),
      ...input,
    };

    return await gigWorkTeamsRepository.create(fakeGigWorkTeam);
  },

  generateFakeSkillHire: async (input: FakeSkillHireInput) => {
    const fakeSkillHire: FakeSkillHire = {
      gigsCompleted: faker.number.int({ min: 1, max: 100 }),
      name: faker.helpers.arrayElement(FAKE_SKILLS),
      ...input,
    };

    return await skillHiresRepository.create(fakeSkillHire);
  },

  generateFakeSkill: async (input: FakeWorkerSkillInput) => {
    const fakeSkill: FakeWorkerSkill = {
      name: faker.helpers.arrayElement(FAKE_SKILLS),
      badgesAwarded: String(faker.helpers.arrayElements(FAKE_BADGES, { min: 1, max: 3 })),
      equipment: faker.helpers.arrayElements(FAKE_EQUIPMENT, { min: 1, max: 2 }).join(', '),
      experienceMonth: faker.number.int({ min: 1, max: 120 }),
      gigsCompleted: faker.number.int({ min: 1, max: 100 }),
      imagesUrl: faker.image.url(),
      ratePerHour: faker.number.int({ min: 10, max: 100 }),
      responseRate: faker.number.int({ min: 0, max: 100 }),
      summary: faker.lorem.sentence(),
      trainingDescription: faker.lorem.paragraph(),
      videoUrl: faker.internet.url(),
      wouldWork: faker.number.int({ min: 0, max: 100 }),
      ...input,
    };

    return await workerSkillsRepository.create(fakeSkill);
  },

  generateFakeSlot: async (input: FakeSlotInput) => {
    const fakeSlot: FakeSlot = {
      endTime: faker.date.future(),
      isAvailable: faker.datatype.boolean(),
      startTime: faker.date.recent(),
      ...input,
    };

    return await slotsRepository.create(fakeSlot);
  },

  generateFakeReview: async (input: FakeReviewInput) => {
    const fakeReview: FakeReview = {
      review: faker.lorem.sentence(),
      appRole: faker.helpers.arrayElement([APP_ROLE.BUYER, APP_ROLE.WORKER]),
      ...input,
    };

    return await reviewsRepository.create(fakeReview);
  },

  generateFakeRecommendation: async (input: FakeRecommendationInput) => {
    const fakeRecommendation: FakeRecommendation = {
      isExternal: faker.datatype.boolean(),
      name: faker.lorem.sentence(),
      recommendation: faker.lorem.paragraph(),
      ...input,
    };

    return await recommendationsRepository.create(fakeRecommendation);
  },
};
