import "./Timer.css";

const Timer = ({ Size }: { Size: number }) => {
  // console.log(Size);
  return (
    <div className="timer">
      {Size > 800 && <span>05 : 21</span>}
      {Size < 800 && (
        <span>
          <div>05</div>
          <div>21</div>
        </span>
      )}
    </div>
  );
};

export default Timer;
