import Customer from "./customer";
import Address from "../value-object/address";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "John");
    }).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("123", "");
    }).toThrow("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("123", "John");
    customer.changeName("Jane");
    expect(customer.name).toBe("Jane");
  });

  it("should activate customer", () => {
    const customer = new Customer("123", "John");
    const address = new Address("Street 1", "1", "12345", "City");
    customer.Address = address;
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when activating without address", () => {
    const customer = new Customer("123", "John");
    expect(() => {
      customer.activate();
    }).toThrow("Address is mandatory to activate a customer");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("123", "John");
    const address = new Address("Street 1", "1", "12345", "City");
    customer.Address = address;
    customer.activate();
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("123", "John");
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });

  it("should generate CustomerCreatedEvent when customer is created", () => {
    const customer = new Customer("123", "John");

    expect(customer.events.length).toBe(1);
    expect(customer.events[0].constructor.name).toBe("CustomerCreatedEvent");
    expect(customer.events[0].eventData).toEqual({ id: "123", name: "John" });
  });

  it("should generate CustomerAddressChangedEvent when address is changed", () => {
    const customer = new Customer("123", "John");
    const address = new Address("Rua ABC", "100", "12345678", "São Paulo");

    customer.changeAddress(address);

    expect(customer.events.length).toBe(2);
    expect(customer.events[1].constructor.name).toBe(
      "CustomerAddressChangedEvent"
    );
    expect(customer.events[1].eventData).toEqual({
      id: "123",
      name: "John",
      address: "Rua ABC, 100, 12345678 São Paulo",
    });
  });

  it("should set address via setter without generating event", () => {
    const customer = new Customer("123", "John");
    const address = new Address("Rua ABC", "100", "12345678", "São Paulo");

    customer.Address = address;

    expect(customer.events.length).toBe(1);
  });
});
