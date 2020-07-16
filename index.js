import { fromEvent, animationFrameScheduler } from "rxjs";
import { map, switchMap, takeUntil, subscribeOn } from "rxjs/operators";

const symbol = document.querySelector(".js");
const m_down$ = fromEvent(symbol, "mousedown");
const m_move$ = fromEvent(symbol, "mousemove");
const m_up$ = fromEvent(symbol, "mouseup");

const move = (start) =>
  m_move$.pipe(
    map((move) => ({
      left: move.clientX - start.offsetX,
      top: move.clientY - start.offsetY,
    })),
    takeUntil(m_up$)
  );

m_down$
  .pipe(switchMap(move), subscribeOn(animationFrameScheduler))
  .subscribe(({ top, left }) => {
    symbol.style.top = `${top}px`;
    symbol.style.left = `${left}px`;
  });
