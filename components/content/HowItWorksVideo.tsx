'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize, Clock, FileText, ChevronDown, Sparkles, Video, Image as ImageIcon } from 'lucide-react';

interface Chapter {
  title: string;
  timeStr: string;
  seconds: number;
  description: string;
}

const CHAPTERS: Chapter[] = [
  { title: 'Introduction & Overview', timeStr: '0:00', seconds: 0, description: 'Overview of runway, burn rate, and solvency concepts' },
  { title: 'Step 1: Liquid Cash Reserves', timeStr: '0:05', seconds: 5, description: 'Inputting current bank balances & accessible treasury accounts' },
  { title: 'Step 2: Expenses & Revenue', timeStr: '0:11', seconds: 11, description: 'Entering monthly gross expenses alongside collected cash revenue' },
  { title: 'Step 3: Calculate Net Burn', timeStr: '0:17', seconds: 17, description: 'Calculating true monthly cash drain (Gross Expenses minus Revenue)' },
  { title: 'Step 4: Runway Forecast', timeStr: '0:24', seconds: 24, description: 'Forecasting available months of runway and solvency benchmarks' },
  { title: 'Step 5: Trajectory & Milestones', timeStr: '0:31', seconds: 31, description: 'Tracking the burn-down trajectory curve and zero-cash date' },
  { title: 'Step 6: Scenario Planning', timeStr: '0:37', seconds: 37, description: 'Simulating expense reductions or hiring to extend runway' },
];

export default function HowItWorksVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(42);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'video' | 'infographic'>('video');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      const cur = video.currentTime;
      let curIdx = 0;
      for (let i = 0; i < CHAPTERS.length; i++) {
        if (cur >= CHAPTERS[i].seconds) {
          curIdx = i;
        }
      }
      setActiveChapterIndex(curIdx);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const seekTo = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = seconds;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6" id="how-it-works-video">
      {/* Tab Switcher: Video Walkthrough vs Static Infographic */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('video')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'video'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Video className="w-4 h-4 text-indigo-600" />
            <span>Interactive Video Walkthrough (42s)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('infographic')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'infographic'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-slate-500" />
            <span>Step-by-Step Infographic</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-500 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>HD 1080p · CC Subtitles · Zero Sign-Up</span>
        </div>
      </div>

      {activeTab === 'video' ? (
        <div className="space-y-6">
          {/* Video Player Container */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative group">
            <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center">
              <video
                ref={videoRef}
                poster="/videos/how-runway-calculator-works-poster.jpg"
                preload="none"
                playsInline
                className="w-full h-full object-contain cursor-pointer"
                onClick={togglePlay}
              >
                <source src="/videos/how-runway-calculator-works.mp4" type="video/mp4" />
                <source src="/videos/how-runway-calculator-works.webm" type="video/webm" />
                <track
                  kind="captions"
                  src="/videos/how-runway-calculator-works.vtt"
                  srcLang="en"
                  label="English CC"
                  default
                />
                Your browser does not support the video tag.
              </video>

              {/* Big Center Play Overlay Button (when paused) */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-indigo-600/90 hover:bg-indigo-600 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all focus:outline-hidden focus:ring-4 focus:ring-indigo-400/50"
                  aria-label="Play Walkthrough Video"
                >
                  <Play className="w-8 h-8 translate-x-0.5 fill-white" />
                </button>
              )}
            </div>

            {/* Custom Bottom Video Controller Bar */}
            <div className="bg-slate-900/95 border-t border-slate-800/80 px-4 py-3 flex flex-col gap-2">
              {/* Progress Slider */}
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono text-slate-400 w-10 text-right">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={duration || 42}
                  step={0.1}
                  value={currentTime}
                  onChange={(e) => seekTo(parseFloat(e.target.value))}
                  className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  aria-label="Seek video position"
                />
                <span className="text-xs font-mono text-slate-400 w-10">
                  {formatTime(duration || 42)}
                </span>
              </div>

              {/* Action Buttons & Current Chapter Title */}
              <div className="flex items-center justify-between text-slate-300 text-xs">
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-white transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => seekTo(0)}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    aria-label="Restart Video"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <div className="hidden sm:block text-slate-400">
                    <span className="text-indigo-400 font-semibold mr-1.5">
                      Chapter {activeChapterIndex + 1}:
                    </span>
                    <span className="text-slate-200">
                      {CHAPTERS[activeChapterIndex].title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    aria-label="Toggle Fullscreen"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Chapter Grid / Key Moments */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Jump to Key Steps in the Video</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">Click to seek timestamp</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {CHAPTERS.map((ch, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <button
                    key={ch.title}
                    type="button"
                    onClick={() => seekTo(ch.seconds)}
                    className={`text-left p-3 rounded-xl border transition-all flex items-start space-x-2.5 ${
                      isActive
                        ? 'bg-indigo-50/70 border-indigo-300 shadow-2xs'
                        : 'bg-slate-50/50 border-slate-200/70 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold shrink-0 mt-0.5 ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {ch.timeStr}
                    </span>
                    <div className="space-y-0.5">
                      <p className={`text-xs font-semibold ${isActive ? 'text-indigo-900' : 'text-slate-800'}`}>
                        {ch.title}
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-1 leading-snug">
                        {ch.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Collapsible Search-Engine-Friendly Video Transcript */}
          <details className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
            <summary className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer list-none select-none">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Full Video Transcript & Explainer Notes</span>
                <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100/80 px-2 py-0.5 rounded-full">
                  SEO Text Index
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-indigo-700">
                <span className="group-open:hidden">Read Full Transcript</span>
                <span className="hidden group-open:inline">Hide Transcript</span>
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </div>
            </summary>

            <div className="px-5 pb-5 pt-3 border-t border-slate-100 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                <span className="font-semibold text-slate-800">
                  [00:00 - 00:05] Introduction & Financial Overview
                </span>
                <p>
                  Welcome to Runway Calculator: accurately calculate your startup cash runway, monthly burn rate, and solvency in minutes. Knowing your exact runway gives you the confidence to manage hiring, investment rounds, and cost controls.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                <span className="font-semibold text-slate-800">
                  [00:05 - 00:11] Step 1: Input Available Liquid Cash Balance
                </span>
                <p>
                  Enter your total available cash reserves across checking accounts, savings, and liquid treasury instruments. For our example, the company enters $250,000 in starting capital.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                <span className="font-semibold text-slate-800">
                  [00:11 - 00:17] Step 2: Input Gross Expenses & Monthly Revenue
                </span>
                <p>
                  Specify your gross monthly cash outflow (salaries, server hosting, software subscriptions, office space) at $25,000 per month, alongside cash receipts collected from customers at $10,000 per month.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                <span className="font-semibold text-slate-800">
                  [00:17 - 00:24] Step 3: Automatic Net Monthly Burn Calculation
                </span>
                <p>
                  The calculation engine applies the fundamental financial formula:
                  <br />
                  <code className="bg-slate-200/80 px-2 py-0.5 rounded font-mono text-slate-800">
                    Net Monthly Burn = Gross Expenses ($25,000) – Cash Revenue ($10,000) = $15,000 / month
                  </code>
                  <br />
                  This reflects the true amount of cash departing the bank account every 30 days.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                <span className="font-semibold text-slate-800">
                  [00:24 - 00:31] Step 4: Real-Time Cash Runway Forecast
                </span>
                <p>
                  By dividing current cash by net burn:
                  <br />
                  <code className="bg-slate-200/80 px-2 py-0.5 rounded font-mono text-slate-800">
                    Runway = $250,000 ÷ $15,000 = 16.7 Months
                  </code>
                  <br />
                  The dashboard highlights a healthy solvency status (12 to 18 months), allowing ample time to achieve growth milestones before fundraising.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                <span className="font-semibold text-slate-800">
                  [00:31 - 00:37] Step 5: Visual Trajectory Chart & Depletion Milestone
                </span>
                <p>
                  Inspect the burn-down chart plotting remaining capital month-over-month: Month 6 ($160k remaining), Month 12 ($70k remaining), and the exact zero-cash boundary reached at Month 16.7.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                <span className="font-semibold text-slate-800">
                  [00:37 - 00:42] Step 6: Interactive Scenario Planning & Extension
                </span>
                <p>
                  Simulate what happens when cutting expenses by 20%: gross burn drops to $20,000/mo, net burn drops to $10,000/mo, and total runway expands from 16.7 to 25.0 months (+8.3 months of additional operating runway). All calculations execute 100% in your browser for complete financial privacy.
                </p>
              </div>
            </div>
          </details>
        </div>
      ) : (
        /* Static Infographic View */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-6 overflow-hidden">
          <div className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-inner border border-slate-100">
            <img
              src="/images/how-runway-calculator-works-step-by-step-guide.jpg"
              alt="How Runway Calculator Works - Step-by-Step Financial Infographic showing cash balance, monthly gross expenses, net burn calculation, and cash depletion projection"
              width={1024}
              height={682}
              className="w-full h-auto object-cover rounded-xl"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
}
