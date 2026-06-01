import { RenderEventSubscriber } from "../interfaces/RenderEventSubscriber";
import { RenderContext } from "../interfaces/RenderContext";

export class PerformanceSubscriber implements RenderEventSubscriber {
  private totalTime = 0;

  update(context: RenderContext): void {
    if (context.renderTime !== undefined) {
      this.totalTime += context.renderTime;
    }
  }

  printSummary(): void {
  console.log(
    `[Performance] Total render time: ${Math.round(this.totalTime)}ms`
  );
  }
}