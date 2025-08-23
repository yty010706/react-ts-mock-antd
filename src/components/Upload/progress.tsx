interface ProgressProps {
  percent: number;
  showPercent?: boolean;
  strokeHeight?: number;
}
export default function Progress({
  percent,
  showPercent = true,
  strokeHeight,
}: ProgressProps) {
  return (
    <div className="progress-bg" style={{ height: `${strokeHeight}px` }}>
      <div className="progress-bar" style={{ width: `${percent}%` }}>
        <span style={{ fontSize: `${strokeHeight}px` }}>
          {showPercent && percent > 10 && `${percent}%`}
        </span>
      </div>
      <span className="progress-bar-animation"></span>
    </div>
  );
}
