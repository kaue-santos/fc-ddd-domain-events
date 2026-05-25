import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2.handler";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";

describe("Customer domain events tests", () => {
  describe("CustomerCreated event", () => {
    it("should register both handlers for CustomerCreatedEvent", () => {
      const eventDispatcher = new EventDispatcher();
      const handler1 = new EnviaConsoleLog1Handler();
      const handler2 = new EnviaConsoleLog2Handler();

      eventDispatcher.register("CustomerCreatedEvent", handler1);
      eventDispatcher.register("CustomerCreatedEvent", handler2);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
      ).toBe(2);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(handler1);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
      ).toMatchObject(handler2);
    });

    it("should notify handler1 when CustomerCreatedEvent is dispatched", () => {
      const eventDispatcher = new EventDispatcher();
      const handler1 = new EnviaConsoleLog1Handler();
      const spyHandler = jest.spyOn(handler1, "handle");

      eventDispatcher.register("CustomerCreatedEvent", handler1);

      const event = new CustomerCreatedEvent({ id: "1", name: "John" });
      eventDispatcher.notify(event);

      expect(spyHandler).toHaveBeenCalledWith(event);
    });

    it("should notify handler2 when CustomerCreatedEvent is dispatched", () => {
      const eventDispatcher = new EventDispatcher();
      const handler2 = new EnviaConsoleLog2Handler();
      const spyHandler = jest.spyOn(handler2, "handle");

      eventDispatcher.register("CustomerCreatedEvent", handler2);

      const event = new CustomerCreatedEvent({ id: "1", name: "John" });
      eventDispatcher.notify(event);

      expect(spyHandler).toHaveBeenCalledWith(event);
    });

    it("should notify both handlers when CustomerCreatedEvent is dispatched", () => {
      const eventDispatcher = new EventDispatcher();
      const handler1 = new EnviaConsoleLog1Handler();
      const handler2 = new EnviaConsoleLog2Handler();
      const spyHandler1 = jest.spyOn(handler1, "handle");
      const spyHandler2 = jest.spyOn(handler2, "handle");

      eventDispatcher.register("CustomerCreatedEvent", handler1);
      eventDispatcher.register("CustomerCreatedEvent", handler2);

      const event = new CustomerCreatedEvent({ id: "1", name: "John" });
      eventDispatcher.notify(event);

      expect(spyHandler1).toHaveBeenCalledWith(event);
      expect(spyHandler2).toHaveBeenCalledWith(event);
    });

    it("should print correct console.log messages for CustomerCreatedEvent handlers", () => {
      const consoleSpy = jest.spyOn(console, "log");

      const handler1 = new EnviaConsoleLog1Handler();
      const handler2 = new EnviaConsoleLog2Handler();
      const event = new CustomerCreatedEvent({ id: "1", name: "John" });

      handler1.handle(event);
      handler2.handle(event);

      expect(consoleSpy).toHaveBeenCalledTimes(2);
      expect(consoleSpy).toHaveBeenNthCalledWith(
        1,
        "Esse é o primeiro console.log do evento: CustomerCreated"
      );
      expect(consoleSpy).toHaveBeenNthCalledWith(
        2,
        "Esse é o segundo console.log do evento: CustomerCreated"
      );

      consoleSpy.mockRestore();
    });
  });

  describe("CustomerAddressChanged event", () => {
    it("should register handler for CustomerAddressChangedEvent", () => {
      const eventDispatcher = new EventDispatcher();
      const handler = new EnviaConsoleLogHandler();

      eventDispatcher.register("CustomerAddressChangedEvent", handler);

      expect(
        eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length
      ).toBe(1);
      expect(
        eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
      ).toMatchObject(handler);
    });

    it("should notify handler when CustomerAddressChangedEvent is dispatched", () => {
      const eventDispatcher = new EventDispatcher();
      const handler = new EnviaConsoleLogHandler();
      const spyHandler = jest.spyOn(handler, "handle");

      eventDispatcher.register("CustomerAddressChangedEvent", handler);

      const event = new CustomerAddressChangedEvent({
        id: "123",
        name: "John",
        address: "Rua ABC, 100, 12345678 São Paulo",
      });
      eventDispatcher.notify(event);

      expect(spyHandler).toHaveBeenCalledWith(event);
    });

    it("should print correct console.log message for CustomerAddressChangedEvent handler", () => {
      const consoleSpy = jest.spyOn(console, "log");

      const handler = new EnviaConsoleLogHandler();
      const event = new CustomerAddressChangedEvent({
        id: "123",
        name: "John",
        address: "Rua ABC, 100, 12345678 São Paulo",
      });

      handler.handle(event);

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith(
        "Endereço do cliente: 123, John alterado para: Rua ABC, 100, 12345678 São Paulo"
      );

      consoleSpy.mockRestore();
    });
  });

  describe("EventDispatcher with Customer events", () => {
    it("should unregister a handler from CustomerCreatedEvent", () => {
      const eventDispatcher = new EventDispatcher();
      const handler1 = new EnviaConsoleLog1Handler();
      const handler2 = new EnviaConsoleLog2Handler();

      eventDispatcher.register("CustomerCreatedEvent", handler1);
      eventDispatcher.register("CustomerCreatedEvent", handler2);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
      ).toBe(2);

      eventDispatcher.unregister("CustomerCreatedEvent", handler1);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
      ).toBe(1);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(handler2);
    });

    it("should unregister all handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const handler1 = new EnviaConsoleLog1Handler();
      const handler2 = new EnviaConsoleLog2Handler();
      const handler3 = new EnviaConsoleLogHandler();

      eventDispatcher.register("CustomerCreatedEvent", handler1);
      eventDispatcher.register("CustomerCreatedEvent", handler2);
      eventDispatcher.register("CustomerAddressChangedEvent", handler3);

      eventDispatcher.unregisterAll();

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeUndefined();
      expect(
        eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
      ).toBeUndefined();
    });
  });
});
