import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function (
  { targetTime, remaingTime, resetHandler },
  ref
) {
  const dialog = useRef();

  const userLost = remaingTime <= 0;
  const leftTime = remaingTime / 1000;
  const score = Math.round((1 - remaingTime / (targetTime * 1000)) * 100);
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={resetHandler}>
      {userLost ? <h2>You Lost</h2> : <h2>You Score: {score}</h2>}
      <p>
        The Target time was{" "}
        <strong>
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </strong>
      </p>
      <p>
        You stopped the timer with <strong>{leftTime} seconds left</strong>
      </p>
      <form method="dialog" onSubmit={resetHandler}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
