import { DocNode } from "../interfaces/DocNode";
import { DocRenderer } from "../interfaces/DocRenderer";
import { RenderEventPublisher } from "../RenderEventPublisher";

export class Section implements DocNode {
  constructor(
    private title: string,
    private renderer: DocRenderer,
    private children: DocNode[] = [],
    private level: number = 1
  ) {}

  add(child: DocNode): void {
    this.children.push(child);
  }

  render(): string {
    const start = performance.now();

    let result = this.renderer.renderHeader(this.level, this.title);

    for (const child of this.children) {
      result += child.render();
    }

    const end = performance.now();

    RenderEventPublisher.notify({
      type: "Section",
      content: this.title,
      level: this.level,
      renderTime: end - start,
    });

    return result;
  }
}