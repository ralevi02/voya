import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import type { FinanceOverview } from '../types/dashboard.types';

/**
 * Donut chart matching the mockup SVG exactly:
 * - Background track at 0.06 opacity
 * - Primary arc (white 0.82) — myShare portion
 * - Secondary arc (white 0.30) — owedToMe portion
 * - Tertiary arc (white 0.10) — remaining
 */

const SIZE = 72;
const CX = SIZE / 2;
const RADIUS = 28;
const STROKE = 9;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface FinanceDonutChartProps {
  finance: FinanceOverview;
}

export function FinanceDonutChart({ finance }: FinanceDonutChartProps) {
  const { total, myShare, owedToMe, currency } = finance;
  const safeTotal = total || 1;

  const primaryLen = (myShare / safeTotal) * CIRCUMFERENCE;
  const secondaryLen = (owedToMe / safeTotal) * CIRCUMFERENCE;
  const tertiaryLen = CIRCUMFERENCE - primaryLen - secondaryLen;

  const primaryOffset = CIRCUMFERENCE * 0.125;
  const secondaryOffset = -(primaryLen - primaryOffset);
  const tertiaryOffset = -(primaryLen + secondaryLen - primaryOffset);

  return (
    <View style={S.container}>
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {/* Background track */}
        <Circle
          cx={CX} cy={CX} r={RADIUS}
          fill="none" stroke="rgba(255,255,255,0.06)"
          strokeWidth={STROKE}
        />
        {/* Primary arc — bright white */}
        <Circle
          cx={CX} cy={CX} r={RADIUS}
          fill="none" stroke="rgba(255,255,255,0.82)"
          strokeWidth={STROKE}
          strokeDasharray={`${primaryLen} ${CIRCUMFERENCE - primaryLen}`}
          strokeDashoffset={primaryOffset}
          strokeLinecap="round"
          rotation={-90} origin={`${CX}, ${CX}`}
        />
        {/* Secondary arc — medium opacity */}
        <Circle
          cx={CX} cy={CX} r={RADIUS}
          fill="none" stroke="rgba(255,255,255,0.30)"
          strokeWidth={STROKE}
          strokeDasharray={`${secondaryLen} ${CIRCUMFERENCE - secondaryLen}`}
          strokeDashoffset={secondaryOffset}
          strokeLinecap="round"
          rotation={-90} origin={`${CX}, ${CX}`}
        />
        {/* Tertiary arc — dim */}
        <Circle
          cx={CX} cy={CX} r={RADIUS}
          fill="none" stroke="rgba(255,255,255,0.10)"
          strokeWidth={STROKE}
          strokeDasharray={`${tertiaryLen} ${CIRCUMFERENCE - tertiaryLen}`}
          strokeDashoffset={tertiaryOffset}
          strokeLinecap="round"
          rotation={-90} origin={`${CX}, ${CX}`}
        />
        {/* Center label — amount */}
        <SvgText
          x={CX} y={CX - 4}
          textAnchor="middle"
          fontSize={10} fontWeight="700"
          fill="rgba(235,236,242,0.90)"
        >
          {currency}{total}
        </SvgText>
        {/* Center label — "total" */}
        <SvgText
          x={CX} y={CX + 10}
          textAnchor="middle"
          fontSize={8}
          fill="rgba(138,142,162,0.45)"
        >
          total
        </SvgText>
      </Svg>
    </View>
  );
}

const S = StyleSheet.create({
  container: {
    flexShrink: 0,
  },
});
