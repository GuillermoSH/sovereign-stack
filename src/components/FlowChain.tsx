export interface FlowChainSub {
  label: string
  detail?: string
}

export interface FlowChainStage {
  label: string
  detail?: string
  sub?: FlowChainSub[]
}

/** Vertical dependency/order diagram for blog content — same dot+rail grammar as
 * the bitácora log and the post index, so "this is a sequence" reads consistently
 * across the site instead of falling back to an ASCII code block. */
export function FlowChain({ stages }: { stages: FlowChainStage[] }) {
  return (
    <div className="flow-chain">
      {stages.map((stage) => (
        <div className="flow-chain__stage" key={stage.label}>
          <span className="flow-chain__dot" aria-hidden="true" />
          <div className="flow-chain__body">
            <p className="flow-chain__label">
              {stage.label}
              {stage.detail ? <span className="flow-chain__detail"> — {stage.detail}</span> : null}
            </p>
            {stage.sub && stage.sub.length > 0 ? (
              <div className="flow-chain__sub">
                {stage.sub.map((s, i) => (
                  <span className="flow-chain__sub-group" key={s.label}>
                    <span className="flow-chain__sub-chip">
                      <span className="flow-chain__sub-label">{s.label}</span>
                      {s.detail ? <span className="flow-chain__sub-detail">{s.detail}</span> : null}
                    </span>
                    {i < stage.sub!.length - 1 ? (
                      <span className="flow-chain__arrow" aria-hidden="true">
                        →
                      </span>
                    ) : null}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}
