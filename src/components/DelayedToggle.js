import React, { useState, useCallback } from "react";

const DelayedToggle = () => {
  const [toggle, setToggle] = useState(false);

  // 1초후 toggle 값을 반전시키느 함수
  const onToggle = useCallback(
    () => setTimeout(() => setToggle((toggle) => !toggle), 1000),
    []
  );

  return (
    <div>
      <button onClick={onToggle}>toggle</button>
      <div>
        상태: <span>{toggle ? "ON" : "OFF"}</span>
      </div>
      {toggle && "onToggle!!"}
    </div>
  );
};

export default DelayedToggle;
