import { productDomainBackend } from './product-domain/backend';

describe('productDomainBackend', () => {
  it('should work', () => {
    expect(productDomainBackend()).toEqual('product-domain/backend');
  });
});
