import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Scale, Droplet, Clock, Thermometer } from 'lucide-react';

interface BrewMethod {
  id: string;
  name: string;
  ratio: number; // e.g. 16 for 1:16
  defaultDose: number;
  grind: string;
  temp: string;
  timeSec: number;
  description: string;
  steps: { label: string; waterFraction: number; timeSec: number }[];
}

const BREW_METHODS: BrewMethod[] = [
  {
    id: 'v60',
    name: 'Hario V60 Dripper',
    ratio: 16,
    defaultDose: 18,
    grind: 'Medium-Fine (Granulated sugar)',
    temp: '93°C (199°F)',
    timeSec: 180, // 3:00
    description: 'Clean, transparent cup highlighting delicate floral and stonefruit notes.',
    steps: [
      { label: 'Bloom with gentle spiral', waterFraction: 0.18, timeSec: 45 },
      { label: 'First continuous center pour', waterFraction: 0.55, timeSec: 60 },
      { label: 'Final top-up and gentle tap', waterFraction: 1.0, timeSec: 75 },
    ],
  },
  {
    id: 'chemex',
    name: 'Chemex Glass Carafe',
    ratio: 15,
    defaultDose: 30,
    grind: 'Medium-Coarse (Coarse sea salt)',
    temp: '94°C (201°F)',
    timeSec: 240, // 4:00
    description: 'Ultra-pure body through thick bonded filters, eliminating sediment and oils.',
    steps: [
      { label: 'Initial saturation bloom', waterFraction: 0.2, timeSec: 45 },
      { label: 'Controlled circular pour to 60%', waterFraction: 0.6, timeSec: 90 },
      { label: 'Final level pour & drawdown', waterFraction: 1.0, timeSec: 105 },
    ],
  },
  {
    id: 'aeropress',
    name: 'AeroPress (Inverted)',
    ratio: 13,
    defaultDose: 16,
    grind: 'Fine-Medium (Fine table salt)',
    temp: '88°C (190°F)',
    timeSec: 120, // 2:00
    description: 'Rich, full-bodied espresso-adjacent intensity with zero bitterness.',
    steps: [
      { label: 'Add grounds & saturate rapidly', waterFraction: 0.5, timeSec: 30 },
      { label: 'Agitate with paddle 5 stirs', waterFraction: 1.0, timeSec: 45 },
      { label: 'Flip and slow 30-second press', waterFraction: 1.0, timeSec: 45 },
    ],
  },
  {
    id: 'frenchpress',
    name: 'Immersion French Press',
    ratio: 12,
    defaultDose: 32,
    grind: 'Coarse (Kosher salt rock)',
    temp: '95°C (203°F)',
    timeSec: 270, // 4:30
    description: 'Heavy, velvety mouthfeel packed with natural coffee lipids and chocolate tones.',
    steps: [
      { label: 'Pour all water aggressively', waterFraction: 1.0, timeSec: 30 },
      { label: 'Rest steep undisturbed', waterFraction: 1.0, timeSec: 180 },
      { label: 'Break crust, skim foam & plunge', waterFraction: 1.0, timeSec: 60 },
    ],
  },
];

export const BrewCalculator: React.FC = () => {
  const [selectedMethodId, setSelectedMethodId] = useState('v60');
  const [doseGrams, setDoseGrams] = useState(18);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const currentMethod = BREW_METHODS.find((m) => m.id === selectedMethodId) || BREW_METHODS[0];

  const totalWaterGrams = Math.round(doseGrams * currentMethod.ratio);

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="brew-dial-in" className="py-16 sm:py-20 bg-[#F5EFEB] border-t border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8A5A30]">
            Home Barista Calibration
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B140E] mt-1">
            Coffee Brew Dial-In Calculator
          </h2>
          <p className="text-sm text-[#705C4D] mt-2">
            Calculate the exact water weight, grind size, and extraction timing for your coffee beans.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Method & Dose Configurator */}
          <div className="lg:col-span-7 bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8DFC8] space-y-6">
            
            {/* Method Tabs */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A5A30] mb-2.5">
                Choose Extraction Method
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {BREW_METHODS.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => {
                      setSelectedMethodId(method.id);
                      setDoseGrams(method.defaultDose);
                      handleResetTimer();
                    }}
                    className={`px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${
                      selectedMethodId === method.id
                        ? 'bg-[#1B140E] text-white shadow-xs'
                        : 'bg-[#EFE8DD] text-[#5C4A3C] hover:bg-[#E5DBCB]'
                    }`}
                  >
                    {method.name.split(' ')[0]}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#7A6655] mt-2">
                {currentMethod.description}
              </p>
            </div>

            {/* Coffee Dose Input & Slider */}
            <div className="pt-4 border-t border-[#E8DFC8]">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8A5A30] flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Coffee Dose (Dry Grounds)</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDoseGrams((d) => Math.max(10, d - 1))}
                    className="w-7 h-7 rounded border border-[#DDD0BC] bg-[#EFE8DD] flex items-center justify-center font-mono text-sm hover:bg-[#E5DBCB] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-mono text-base font-bold text-[#1B140E] min-w-12 text-center tabular-nums">
                    {doseGrams}g
                  </span>
                  <button
                    onClick={() => setDoseGrams((d) => Math.min(60, d + 1))}
                    className="w-7 h-7 rounded border border-[#DDD0BC] bg-[#EFE8DD] flex items-center justify-center font-mono text-sm hover:bg-[#E5DBCB] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <input
                type="range"
                min="10"
                max="60"
                value={doseGrams}
                onChange={(e) => setDoseGrams(Number(e.target.value))}
                className="w-full accent-[#C57D3C] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#8C7A6D] mt-1 font-mono">
                <span>10g (Single cup)</span>
                <span>30g (Sharing carafe)</span>
                <span>60g (Full pot)</span>
              </div>
            </div>

            {/* Dial-in Specifications 4-Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E8DFC8]">
              <div className="bg-[#F5EFEB] p-3 rounded-xl border border-[#E8DFC8]">
                <div className="flex items-center gap-1 text-[11px] text-[#8A5A30] font-medium">
                  <Droplet className="w-3.5 h-3.5" />
                  <span>Water Target</span>
                </div>
                <p className="text-xl font-serif font-bold text-[#1B140E] mt-1 font-mono tabular-nums">
                  {totalWaterGrams}g
                </p>
                <p className="text-[10px] text-[#8C7A6D]">1:{currentMethod.ratio} ratio</p>
              </div>

              <div className="bg-[#F5EFEB] p-3 rounded-xl border border-[#E8DFC8]">
                <div className="flex items-center gap-1 text-[11px] text-[#8A5A30] font-medium">
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>Water Temp</span>
                </div>
                <p className="text-sm font-bold text-[#1B140E] mt-1">
                  {currentMethod.temp}
                </p>
                <p className="text-[10px] text-[#8C7A6D]">Filtered 50-100 ppm</p>
              </div>

              <div className="bg-[#F5EFEB] p-3 rounded-xl border border-[#E8DFC8]">
                <div className="flex items-center gap-1 text-[11px] text-[#8A5A30] font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Target Time</span>
                </div>
                <p className="text-xl font-serif font-bold text-[#1B140E] mt-1 font-mono tabular-nums">
                  {formatTimer(currentMethod.timeSec)}
                </p>
                <p className="text-[10px] text-[#8C7A6D]">Total contact time</p>
              </div>

              <div className="bg-[#F5EFEB] p-3 rounded-xl border border-[#E8DFC8]">
                <div className="flex items-center gap-1 text-[11px] text-[#8A5A30] font-medium">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Grind Size</span>
                </div>
                <p className="text-xs font-semibold text-[#1B140E] mt-1 truncate">
                  {currentMethod.grind.split(' ')[0]}
                </p>
                <p className="text-[10px] text-[#8C7A6D]">Burr calibrated</p>
              </div>
            </div>

            {/* Pour Stages */}
            <div className="pt-4 border-t border-[#E8DFC8]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8A5A30] mb-3">
                Pour Schedule & Water Volumes
              </h4>
              <div className="space-y-2">
                {currentMethod.steps.map((st, idx) => {
                  const stepTargetGrams = Math.round(totalWaterGrams * st.waterFraction);
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-[#F5EFEB] border border-[#E8DFC8] text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#1B140E] text-white flex items-center justify-center text-[10px] font-mono">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-[#291D15]">{st.label}</span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="text-[#8A5A30] font-bold tabular-nums">
                          Pour to {stepTargetGrams}g
                        </span>
                        <span className="text-[#8C7A6D]">~{st.timeSec}s</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Live Interactive Brew Timer */}
          <div className="lg:col-span-5 bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8DFC8] flex flex-col items-center justify-between text-center space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8A5A30]">
                Live Barista Stopwatch
              </span>
              <h3 className="text-lg font-serif font-bold text-[#1B140E] mt-1">
                Extraction Timer
              </h3>
              <p className="text-xs text-[#7A6655] mt-1">
                Hit start as your hot water touches the dry bed of grounds.
              </p>
            </div>

            {/* Big Stopwatch Display */}
            <div className="w-52 h-52 rounded-full border-4 border-[#291D15] bg-[#F5EFEB] flex flex-col items-center justify-center shadow-md relative">
              <span className="font-mono text-5xl font-bold text-[#1B140E] tracking-tight tabular-nums">
                {formatTimer(timerSeconds)}
              </span>
              <span className="text-xs text-[#8A5A30] mt-1 font-mono">
                Target: {formatTimer(currentMethod.timeSec)}
              </span>

              {isTimerRunning && (
                <div className="absolute inset-0 rounded-full border-4 border-[#C57D3C] animate-ping opacity-25 pointer-events-none" />
              )}
            </div>

            {/* Timer Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                  isTimerRunning
                    ? 'bg-[#B91C1C] text-white hover:bg-[#991B1B]'
                    : 'bg-[#1B140E] text-white hover:bg-[#2F2218]'
                }`}
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause Timer</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start Pouring</span>
                  </>
                )}
              </button>

              <button
                onClick={handleResetTimer}
                className="px-4 py-3 rounded-xl text-xs font-semibold bg-[#EFE8DD] text-[#5C4A3C] hover:bg-[#E5DBCB] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>

            <div className="w-full bg-[#F5EFEB] p-3 rounded-lg border border-[#E8DFC8] text-[11px] text-[#705C4D]">
              💡 Pro Barista Tip: Pour in steady concentric circles from the center outwards, avoiding the paper filter walls directly to maintain uniform extraction.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
