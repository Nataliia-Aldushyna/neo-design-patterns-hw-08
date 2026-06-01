import { RenderEventSubscriber } from "../interfaces/RenderEventSubscriber";
import { RenderContext } from "../interfaces/RenderContext";

export class RenderLoggerSubscriber implements RenderEventSubscriber {
  update(context: RenderContext): void {
    const { type, content, level, items } = context;
    if (type === 'Paragraph') {
      console.log(`[Log] Rendered Paragraph (${content.length} chars)`);
    } else if (type === 'List') {
      console.log(`[Log] Rendered List (${items?.length ?? 0} items)`);
    } else if (type === 'Section') {
      console.log(`[Log] Rendered Section ("${content}", level ${level})`);
    }
  }
}
