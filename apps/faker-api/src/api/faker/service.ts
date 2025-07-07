import { faker } from '@faker-js/faker';

import type {
  FakeBuyer,
  FakeGigWork,
  FakeGigWorkTeam,
  FakePrivateDataUser,
  FakeRecommendation,
  FakeReview,
  FakeSkill,
  FakeSkillHire,
  FakeSlot,
  FakeStatistic,
  FakeUser,
  FakeUserData,
  FakeWorker,
} from '../../interfaces';

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
  skillsRepository,
  slotsRepository,
  statisticsRepository,
  userRepository,
  workerRepository,
} = repositories;

const fakeBadges = ['Top Performer', 'Outstanding Contributor', 'Innovation Award'];
const fakeEquipment = ['Laptop', 'Smartphone', 'desktop', 'mac', 'camera', 'microphone'];
const FakeSkills = ['JavaScript', 'Python', 'Java', 'C#', 'Ruby', 'PHP', 'Go', 'Swift', 'Kotlin'];

export const fakerService = {
  generateFakeUserData: async (input: FakeUserData = {}) => {
    const { buyer, privateDataUser, user, worker } = input;

    const [fakePrivateDataUser] = await fakerService.generateFakePrivateDataUser(privateDataUser);

    const [fakeUser] = await fakerService.generateFakeUser({
      ...user,
      privateDataUserId: fakePrivateDataUser.id,
    });

    const [fakeBuyer] = await fakerService.generateFakeBuyer({
      ...buyer,
      userId: fakeUser.id,
    });

    const [fakeWorker] = await fakerService.generateFakeWorker({
      ...worker,
      userId: fakeUser.id,
    });

    const [gigWork] = await fakerService.generateFakeGigWork({
      buyerId: fakeBuyer.id,
      address: fakeBuyer.businessAddress,
    });

    const [gigWorkTeam] = await fakerService.generateFakeGigWorkTeam({
      gigWorkId: gigWork.id,
      workerId: fakeWorker.id,
    });

    const [skillHire] = await fakerService.generateFakeSkillHire({
      buyerId: fakeBuyer.id,
    });

    const [skill] = await fakerService.generateFakeSkill({
      workerId: fakeWorker.id,
    });

    const [slot] = await fakerService.generateFakeSlot({
      workerId: fakeWorker.id,
    });

    const [review] = await fakerService.generateFakeReview({
      userId: fakeUser.id,
    });

    const [recommendation] = await fakerService.generateFakeRecommendation({
      userId: fakeUser.id,
      workerId: fakeWorker.id,
    });

    const [statistic] = await fakerService.generateFakeStatistic({
      userId: fakeUser.id,
    });

    return {
      buyer: fakeBuyer,
      gigWork,
      gigWorkTeam,
      privateDataUser: fakePrivateDataUser,
      review,
      recommendation,
      skillHire,
      skill,
      slot,
      statistic,
      user: fakeUser,
      worker: fakeWorker,
    };
  },

  removeFakeUserData: async (userId: string) => {
    await userRepository.deleteById(userId);
  },

  generateFakeBuyer: async (input?: FakeBuyer) => {
    const fakeBuyer: FakeBuyer = {
      badgesAwarded: String(faker.helpers.arrayElements(fakeBadges, { min: 1, max: 3 })),
      businessAddress: faker.location.streetAddress(),
      businessName: faker.company.name(),
      businessRegistrationNumber: faker.string.alphanumeric(10),
      businessRole: faker.person.jobTitle(),
      representativeId: faker.string.uuid(),
      socialNetworkUrl: faker.internet.url(),
      videoUrl: faker.internet.url(),
      ...input,
    };

    return await buyerRepository.create(fakeBuyer);
  },

  generateFakePrivateDataUser: async (input?: Partial<FakePrivateDataUser>) => {
    const fakePrivateDataUser: FakePrivateDataUser = {
      address: faker.location.streetAddress(),
      kycUrl: faker.internet.url(),
      latitude: String(faker.location.latitude({ min: 51.4, max: 51.55 })),
      longitude: String(faker.location.longitude({ min: -0.25, max: 0.05 })),
      phoneNumber: faker.phone.number(),
      rwtUrl: faker.internet.url(),
      ...input,
    };

    return await privateDataUserRepository.create(fakePrivateDataUser);
  },

  generateFakeUser: async (input?: Partial<FakeUser>) => {
    const withoutPrivateData = input.withoutPrivateData ?? faker.datatype.boolean();

    const fakeUser: FakeUser = {
      isBuyerAllowed: faker.datatype.boolean(),
      isKycApproved: faker.datatype.boolean(),
      isPublicProfile: faker.datatype.boolean(),
      isRtwApproved: faker.datatype.boolean(),
      isWorkerAllowed: faker.datatype.boolean(),
      privateDataUserId: withoutPrivateData ? null : faker.number.int({ min: 1, max: 1000 }),
      roleId: 1,
      uid: faker.string.uuid(),
      withoutPrivateData,
      socialMediaUrl: faker.internet.url(),
      ...input,
    };

    return await userRepository.create(fakeUser);
  },

  generateFakeWorker: async (input?: FakeWorker) => {
    const fakeWorker: FakeWorker = {
      feedbackSummary: faker.lorem.sentence(),
      socialNetworkUrl: faker.internet.url(),
      tags: String(faker.helpers.arrayElements(FakeSkills, { min: 1, max: 3 })),
      ...input,
    };

    return await workerRepository.create(fakeWorker);
  },

  generateFakeGigWork: async (input?: Partial<FakeGigWork>) => {
    const fakeGigWork: FakeGigWork = {
      address: faker.location.streetAddress(),
      description: faker.lorem.paragraph(),
      endDate: faker.date.future(),
      buyerId: faker.number.int({ min: 1, max: 1000 }),
      startDate: faker.date.recent(),
      title: faker.lorem.sentence(),
      paymentPerHour: faker.number.int({ min: 10, max: 100 }),
      ...input,
    };

    return await gigWorksRepository.create(fakeGigWork);
  },

  generateFakeGigWorkTeam: async (input?: Partial<FakeGigWorkTeam>) => {
    const fakeGigWorkTeam: FakeGigWorkTeam = {
      awardedBadge: faker.helpers.arrayElement(fakeBadges),
      delegateTo: faker.number.int({ min: 1, max: 1000 }),
      endDateOffer: faker.date.future(),
      endGig: faker.datatype.boolean(),
      gigWorkId: faker.number.int({ min: 1, max: 1000 }),
      workerId: faker.number.int({ min: 1, max: 1000 }),
      feedback: faker.lorem.sentence(),
      isAcceptedOffer: faker.datatype.boolean(),
      paymentId: faker.number.int({ min: 1, max: 1000 }),
      skillId: faker.number.int({ min: 1, max: 1000 }),
      tips: faker.number.int({ min: 0, max: 100 }),
      totalPayment: faker.number.int({ min: 10, max: 1000 }),
      workTime: faker.number.int({ min: 1, max: 100 }),
      wouldWork: faker.datatype.boolean(),
      ...input,
    };

    return await gigWorkTeamsRepository.create(fakeGigWorkTeam);
  },

  generateFakeSkillHire: async (input?: Partial<FakeSkillHire>) => {
    const fakeSkillHire: FakeSkillHire = {
      buyerId: faker.number.int({ min: 1, max: 1000 }),
      gigsCompleted: faker.number.int({ min: 1, max: 100 }),
      name: faker.helpers.arrayElement(FakeSkills),
      ...input,
    };

    return await skillHiresRepository.create(fakeSkillHire);
  },

  generateFakeSkill: async (input?: Partial<FakeSkill>) => {
    const fakeSkill: FakeSkill = {
      name: faker.helpers.arrayElement(FakeSkills),
      badgesAwarded: String(faker.helpers.arrayElements(fakeBadges, { min: 1, max: 3 })),
      equipment: faker.helpers.arrayElements(fakeEquipment, { min: 1, max: 2 }).join(', '),
      experienceMonth: faker.number.int({ min: 1, max: 120 }),
      gigsCompleted: faker.number.int({ min: 1, max: 100 }),
      imagesUrl: faker.image.url(),
      ratePerHour: faker.number.int({ min: 10, max: 100 }),
      summary: faker.lorem.sentence(),
      trainingDescription: faker.lorem.paragraph(),
      videoUrl: faker.internet.url(),
      workerId: faker.number.int({ min: 1, max: 1000 }),
      ...input,
    };

    return await skillsRepository.create(fakeSkill);
  },

  generateFakeSlot: async (input?: Partial<FakeSlot>) => {
    const fakeSlot: FakeSlot = {
      endTime: faker.date.future(),
      isAvailable: faker.datatype.boolean(),
      startTime: faker.date.recent(),
      workerId: faker.number.int({ min: 1, max: 1000 }),
      ...input,
    };

    return await slotsRepository.create(fakeSlot);
  },

  generateFakeReview: async (input?: Partial<FakeReview>) => {
    const fakeReview: FakeReview = {
      review: faker.lorem.sentence(),
      userId: faker.number.int({ min: 1, max: 1000 }),
      ...input,
    };

    return await reviewsRepository.create(fakeReview);
  },

  generateFakeRecommendation: async (input?: Partial<FakeRecommendation>) => {
    const fakeRecommendation: FakeRecommendation = {
      isExternal: faker.datatype.boolean(),
      name: faker.lorem.sentence(),
      recommendation: faker.lorem.paragraph(),
      userId: faker.number.int({ min: 1, max: 1000 }),
      workerId: faker.number.int({ min: 1, max: 1000 }),
      ...input,
    };

    return await recommendationsRepository.create(fakeRecommendation);
  },

  generateFakeStatistic: async (input?: Partial<FakeStatistic>) => {
    const fakeStatistic: FakeStatistic = {
      appRole: faker.helpers.arrayElement([APP_ROLE.BUYER, APP_ROLE.WORKER]),
      responseRate: faker.number.int({ min: 0, max: 100 }),
      userId: faker.number.int({ min: 1, max: 1000 }),
      wouldWork: faker.number.int({ min: 0, max: 100 }),
      ...input,
    };

    return await statisticsRepository.create(fakeStatistic);
  },
};
