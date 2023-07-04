import { Component } from "@/types/components";
import { generateRandomNumericId } from "@/utils/functions";

export default class Entity {
  readonly id: number;
  readonly components: Partial<Record<string, Component>> = {};

  constructor() {
    this.id = generateRandomNumericId(6);
  }

  addComponent(component: Component) {
    this.components[component.name] = component;
  }

  removeComponent(componentName: string) {
    delete this.components[componentName];
  }

  getComponent<T extends Component>(componentName: T["name"]): T | undefined {
    const component = this.components[componentName] as T;
    if (component && component.name === componentName) {
      return component as T;
    }
    return undefined;
  }
}
