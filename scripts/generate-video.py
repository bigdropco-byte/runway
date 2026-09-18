#!/usr/bin/env python3
"""
Generate official 1080p 30fps video walkthrough for RunwayCalculator.dev
Includes:
- public/videos/how-runway-calculator-works.mp4
- public/videos/how-runway-calculator-works.webm
- public/videos/how-runway-calculator-works-poster.jpg
- public/videos/how-runway-calculator-works.vtt
"""

import os
import sys
import math
import subprocess
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

WIDTH = 1920
HEIGHT = 1080
FPS = 30
TOTAL_SECONDS = 42
TOTAL_FRAMES = FPS * TOTAL_SECONDS

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "videos")
os.makedirs(OUTPUT_DIR, exist_ok=True)

MP4_PATH = os.path.join(OUTPUT_DIR, "how-runway-calculator-works.mp4")
WEBM_PATH = os.path.join(OUTPUT_DIR, "how-runway-calculator-works.webm")
POSTER_PATH = os.path.join(OUTPUT_DIR, "how-runway-calculator-works-poster.jpg")
VTT_PATH = os.path.join(OUTPUT_DIR, "how-runway-calculator-works.vtt")

# System fonts
FONT_SANS = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if os.path.exists("/System/Library/Fonts/Supplemental/Arial Bold.ttf") else FONT_SANS
if not os.path.exists(FONT_SANS):
    FONT_SANS = "/System/Library/Fonts/Helvetica.ttc"
    FONT_BOLD = FONT_SANS

f_hero = ImageFont.truetype(FONT_BOLD, 64)
f_title = ImageFont.truetype(FONT_BOLD, 46)
f_h2 = ImageFont.truetype(FONT_BOLD, 36)
f_body = ImageFont.truetype(FONT_SANS, 26)
f_body_bold = ImageFont.truetype(FONT_BOLD, 26)
f_small = ImageFont.truetype(FONT_SANS, 20)
f_small_bold = ImageFont.truetype(FONT_BOLD, 20)
f_kpi_huge = ImageFont.truetype(FONT_BOLD, 92)
f_kpi_val = ImageFont.truetype(FONT_BOLD, 54)

# Color Palette
BG_COLOR = (11, 15, 25)          # #0B0F19
CARD_BG = (19, 26, 43)           # #131A2B
CARD_BORDER = (37, 49, 77)       # #25314D
TEXT_WHITE = (255, 255, 255)
TEXT_MUTED = (148, 163, 184)     # #94A3B8
TEXT_DARK = (100, 116, 139)      # #64748B
INDIGO = (99, 102, 241)          # #6366F1
INDIGO_LIGHT = (129, 140, 248)   # #818CF8
INDIGO_BG = (30, 27, 75)         # #1E1B4B
EMERALD = (16, 185, 129)         # #10B981
EMERALD_BG = (6, 78, 59)
AMBER = (245, 158, 11)           # #F59E0B
AMBER_BG = (69, 26, 3)
ROSE = (244, 63, 94)             # #F43F5E
SKY = (14, 165, 233)             # #0EA5E9

STEPS = [
    {"num": 1, "title": "Liquid Cash Reserves", "time": "0:05", "start_f": 150, "end_f": 330},
    {"num": 2, "title": "Expenses & Revenue", "time": "0:11", "start_f": 330, "end_f": 510},
    {"num": 3, "title": "Calculate Net Burn", "time": "0:17", "start_f": 510, "end_f": 720},
    {"num": 4, "title": "Runway Forecast", "time": "0:24", "start_f": 720, "end_f": 930},
    {"num": 5, "title": "Trajectory & Milestones", "time": "0:31", "start_f": 930, "end_f": 1110},
    {"num": 6, "title": "Scenario Planning", "time": "0:37", "start_f": 1110, "end_f": 1260},
]

def ease_in_out_quad(t):
    if t < 0.5:
        return 2 * t * t
    return -1 + (4 - 2 * t) * t

def draw_pill(draw, xy, text, font, text_color, bg_color, border_color=None, padding_x=16, padding_y=8):
    bbox = font.getbbox(text)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    x, y = xy
    w = tw + padding_x * 2
    h = th + padding_y * 2
    draw.rounded_rectangle([x, y, x + w, y + h], radius=h//2, fill=bg_color, outline=border_color, width=1)
    draw.text((x + padding_x - bbox[0], y + padding_y - bbox[1]), text, font=font, fill=text_color)
    return w, h

def draw_header(draw, current_sec, current_step_idx):
    # Top navbar
    draw.line([(0, 80), (WIDTH, 80)], fill=(26, 36, 56), width=1)
    
    # Logo
    draw.ellipse([(60, 24), (96, 60)], fill=INDIGO)
    # Runway icon plane / line
    draw.line([(78, 30), (78, 54)], fill=TEXT_WHITE, width=3)
    draw.line([(70, 38), (86, 38)], fill=TEXT_WHITE, width=2)
    draw.line([(73, 48), (83, 48)], fill=TEXT_WHITE, width=2)
    
    draw.text((110, 26), "Runway Calculator", font=f_h2, fill=TEXT_WHITE)
    draw.text((430, 32), "·  Official Walkthrough  ·  runwaycalculator.dev", font=f_body, fill=TEXT_MUTED)
    
    # Timecode
    time_str = f"{int(current_sec)//60:02d}:{int(current_sec)%60:02d} / 00:42"
    draw.text((WIDTH - 220, 32), time_str, font=f_body_bold, fill=TEXT_MUTED)

def draw_footer_progress(draw, frame_idx):
    # Bottom step timeline bar
    draw.rectangle([(0, HEIGHT - 70), (WIDTH, HEIGHT)], fill=(15, 23, 42))
    draw.line([(0, HEIGHT - 70), (WIDTH, HEIGHT - 70)], fill=(30, 41, 59), width=1)
    
    # Total progress fill
    progress_w = (frame_idx / TOTAL_FRAMES) * WIDTH
    draw.rectangle([(0, HEIGHT - 70), (progress_w, HEIGHT - 66)], fill=INDIGO)
    
    # Step markers
    step_width = WIDTH / len(STEPS)
    for i, s in enumerate(STEPS):
        sx = i * step_width
        is_active = s["start_f"] <= frame_idx < s["end_f"]
        is_done = frame_idx >= s["end_f"]
        
        dot_color = INDIGO if is_active else (EMERALD if is_done else TEXT_DARK)
        text_color = TEXT_WHITE if is_active else (TEXT_MUTED if is_done else TEXT_DARK)
        
        draw.ellipse([(sx + 30, HEIGHT - 46), (sx + 42, HEIGHT - 34)], fill=dot_color)
        draw.text((sx + 50, HEIGHT - 47), f"Step {s['num']}: {s['title']}", font=f_small_bold if is_active else f_small, fill=text_color)

def render_frame(frame_idx):
    img = Image.new("RGB", (WIDTH, HEIGHT), color=BG_COLOR)
    draw = ImageDraw.Draw(img)
    
    # Ambient background gradients/glow
    draw.ellipse([(WIDTH//2 - 600, -400), (WIDTH//2 + 600, 300)], fill=(20, 28, 55))
    draw.ellipse([(WIDTH//2 - 300, -200), (WIDTH//2 + 300, 150)], fill=(30, 35, 75))
    
    current_sec = frame_idx / FPS
    
    # Determine current step index (-1 for intro)
    step_idx = -1
    for i, s in enumerate(STEPS):
        if s["start_f"] <= frame_idx < s["end_f"]:
            step_idx = i
            break
            
    draw_header(draw, current_sec, step_idx)
    draw_footer_progress(draw, frame_idx)
    
    # ==================== SCENE 0: INTRO (0 - 5s, Frames 0 - 150) ====================
    if frame_idx < 150:
        draw_pill(draw, (WIDTH//2 - 270, 200), "RUNWAYCALCULATOR.DEV · INTERACTIVE GUIDE", f_small_bold, INDIGO_LIGHT, INDIGO_BG, INDIGO, 20, 8)
        
        draw.text((WIDTH//2 - 470, 270), "How Runway Calculator Works", font=f_hero, fill=TEXT_WHITE)
        draw.text((WIDTH//2 - 450, 360), "Understand Your Startup Cash Runway, Burn Rate & Solvency", font=f_h2, fill=TEXT_MUTED)
        
        # 3 Preview Cards
        cards = [
            ("1. Input Financials", "Cash reserves, burn rate & monthly revenue", INDIGO),
            ("2. Instant Forecast", "Exact runway months & cash out date", EMERALD),
            ("3. Scenario Modeling", "Test hiring, cost cuts & revenue growth", SKY),
        ]
        card_w = 380
        gap = 40
        start_x = (WIDTH - (len(cards) * card_w + (len(cards) - 1) * gap)) // 2
        
        for i, (ctitle, cdesc, ccol) in enumerate(cards):
            cx = start_x + i * (card_w + gap)
            cy = 500
            draw.rounded_rectangle([cx, cy, cx + card_w, cy + 240], radius=16, fill=CARD_BG, outline=CARD_BORDER, width=2)
            draw.line([(cx, cy + 6), (cx + card_w, cy + 6)], fill=ccol, width=4)
            draw.ellipse([(cx + 25, cy + 35), (cx + 55, cy + 65)], fill=CARD_BORDER)
            draw.text((cx + 35, cy + 37), str(i+1), font=f_body_bold, fill=TEXT_WHITE)
            draw.text((cx + 70, cy + 37), ctitle, font=f_body_bold, fill=TEXT_WHITE)
            draw.text((cx + 25, cy + 110), cdesc, font=f_body, fill=TEXT_MUTED)
            
        draw.text((WIDTH//2 - 250, 850), "Let's walk through the 6 simple steps →", font=f_h2, fill=INDIGO_LIGHT)

    # ==================== SCENE 1: STEP 1 - CASH RESERVES (5 - 11s, 150 - 330) ====================
    elif 150 <= frame_idx < 330:
        local_f = frame_idx - 150
        t = min(1.0, local_f / 60.0)
        cash_val = int(250000 * ease_in_out_quad(t))
        
        draw_pill(draw, (180, 140), "STEP 1 OF 6", f_small_bold, INDIGO_LIGHT, INDIGO_BG, INDIGO, 16, 6)
        draw.text((180, 190), "Enter Your Available Cash Balance", font=f_title, fill=TEXT_WHITE)
        draw.text((180, 255), "Include all liquid reserves: checking, savings, and short-term treasury bills.", font=f_body, fill=TEXT_MUTED)
        
        # Big Input Box Mockup
        bx, by, bw, bh = 180, 330, 1560, 280
        draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=20, fill=CARD_BG, outline=INDIGO if local_f > 20 else CARD_BORDER, width=2)
        
        draw.text((bx + 50, by + 40), "CURRENT LIQUID CASH RESERVES ($)", font=f_small_bold, fill=TEXT_MUTED)
        
        # Cash value with dollar sign
        val_str = f"${cash_val:,.0f}"
        draw.text((bx + 50, by + 90), val_str, font=f_kpi_huge, fill=TEXT_WHITE)
        
        # Flashing cursor
        if (frame_idx // 15) % 2 == 0 and t < 1.0:
            val_bbox = f_kpi_huge.getbbox(val_str)
            cx = bx + 55 + (val_bbox[2] - val_bbox[0])
            draw.line([(cx, by + 100), (cx, by + 180)], fill=INDIGO_LIGHT, width=4)
            
        # Helper note badge
        draw_pill(draw, (bx + 50, by + 210), "✓ Excludes illiquid assets, unexercised options, and pending pledges", f_small, EMERALD, EMERALD_BG, padding_x=14, padding_y=6)
        
        # Benchmark pill in corner
        draw_pill(draw, (bx + bw - 380, by + 50), "Seed / Series A Benchmark: $250k", f_small_bold, SKY, (15, 30, 50), SKY, 14, 6)

    # ==================== SCENE 2: STEP 2 - EXPENSES & REVENUE (11 - 17s, 330 - 510) ====================
    elif 330 <= frame_idx < 510:
        local_f = frame_idx - 330
        t = min(1.0, local_f / 50.0)
        exp_val = int(25000 * ease_in_out_quad(t))
        rev_val = int(10000 * ease_in_out_quad(t))
        
        draw_pill(draw, (180, 140), "STEP 2 OF 6", f_small_bold, INDIGO_LIGHT, INDIGO_BG, INDIGO, 16, 6)
        draw.text((180, 190), "Input Monthly Gross Expenses & Monthly Revenue", font=f_title, fill=TEXT_WHITE)
        draw.text((180, 255), "Distinguish total cash outflow from incoming cash collected from customers.", font=f_body, fill=TEXT_MUTED)
        
        # Two side-by-side cards
        card_w = 750
        # Card 1: Gross Expenses
        cx1 = 180
        cy1 = 330
        draw.rounded_rectangle([cx1, cy1, cx1 + card_w, cy1 + 380], radius=20, fill=CARD_BG, outline=AMBER if local_f > 15 else CARD_BORDER, width=2)
        draw_pill(draw, (cx1 + 40, cy1 + 35), "CASH OUTFLOW", f_small_bold, AMBER, AMBER_BG, AMBER, 12, 5)
        draw.text((cx1 + 40, cy1 + 80), "Monthly Gross Expenses", font=f_h2, fill=TEXT_WHITE)
        draw.text((cx1 + 40, cy1 + 130), f"${exp_val:,.0f} / mo", font=f_kpi_huge, fill=AMBER)
        
        draw.line([(cx1 + 40, cy1 + 240), (cx1 + card_w - 40, cy1 + 240)], fill=CARD_BORDER, width=1)
        draw.text((cx1 + 40, cy1 + 265), "• Payroll & Contractor Salaries (~70%)", font=f_body, fill=TEXT_MUTED)
        draw.text((cx1 + 40, cy1 + 305), "• Cloud Infrastructure, SaaS & Office Rent", font=f_body, fill=TEXT_MUTED)
        draw.text((cx1 + 40, cy1 + 345), "• Marketing & Sales Customer Acquisition", font=f_body, fill=TEXT_MUTED)
        
        # Card 2: Cash Revenue
        cx2 = 990
        cy2 = 330
        draw.rounded_rectangle([cx2, cy2, cx2 + card_w, cy2 + 380], radius=20, fill=CARD_BG, outline=EMERALD if local_f > 25 else CARD_BORDER, width=2)
        draw_pill(draw, (cx2 + 40, cy2 + 35), "CASH INFLOW", f_small_bold, EMERALD, EMERALD_BG, EMERALD, 12, 5)
        draw.text((cx2 + 40, cy2 + 80), "Monthly Cash Revenue", font=f_h2, fill=TEXT_WHITE)
        draw.text((cx2 + 40, cy2 + 130), f"${rev_val:,.0f} / mo", font=f_kpi_huge, fill=EMERALD)
        
        draw.line([(cx2 + 40, cy2 + 240), (cx2 + card_w - 40, cy2 + 240)], fill=CARD_BORDER, width=1)
        draw.text((cx2 + 40, cy2 + 265), "• Collected subscription & SaaS ARR/MRR", font=f_body, fill=TEXT_MUTED)
        draw.text((cx2 + 40, cy2 + 305), "• Client retainer fees & paid invoices", font=f_body, fill=TEXT_MUTED)
        draw.text((cx2 + 40, cy2 + 345), "• Actual cash received (not uncollected A/R)", font=f_body, fill=TEXT_MUTED)

    # ==================== SCENE 3: STEP 3 - NET BURN FORMULA (17 - 24s, 510 - 720) ====================
    elif 510 <= frame_idx < 720:
        local_f = frame_idx - 510
        t = min(1.0, local_f / 45.0)
        
        draw_pill(draw, (180, 140), "STEP 3 OF 6", f_small_bold, INDIGO_LIGHT, INDIGO_BG, INDIGO, 16, 6)
        draw.text((180, 190), "Automatic Net Monthly Burn Calculation", font=f_title, fill=TEXT_WHITE)
        draw.text((180, 255), "Net burn reflects the actual cash draining from your bank account every 30 days.", font=f_body, fill=TEXT_MUTED)
        
        # Formula equation banner
        fx, fy, fw, fh = 180, 320, 1560, 120
        draw.rounded_rectangle([fx, fy, fx + fw, fy + fh], radius=16, fill=(24, 33, 56), outline=INDIGO, width=2)
        draw.text((fx + 50, fy + 40), "Net Monthly Burn  =  Gross Monthly Expenses  –  Monthly Cash Revenue", font=f_h2, fill=TEXT_WHITE)
        
        # Visual breakdown cards
        bx, by = 180, 480
        # Card Gross
        draw.rounded_rectangle([bx, by, bx + 440, by + 240], radius=18, fill=CARD_BG, outline=CARD_BORDER, width=2)
        draw.text((bx + 35, by + 35), "Gross Expenses", font=f_body_bold, fill=TEXT_MUTED)
        draw.text((bx + 35, by + 90), "$25,000", font=f_kpi_val, fill=AMBER)
        draw.text((bx + 35, by + 175), "Total cash going out", font=f_small, fill=TEXT_DARK)
        
        # Minus symbol
        draw.text((bx + 480, by + 90), "–", font=f_kpi_huge, fill=TEXT_WHITE)
        
        # Card Revenue
        bx2 = bx + 550
        draw.rounded_rectangle([bx2, by, bx2 + 440, by + 240], radius=18, fill=CARD_BG, outline=CARD_BORDER, width=2)
        draw.text((bx2 + 35, by + 35), "Monthly Revenue", font=f_body_bold, fill=TEXT_MUTED)
        draw.text((bx2 + 35, by + 90), "$10,000", font=f_kpi_val, fill=EMERALD)
        draw.text((bx2 + 35, by + 175), "Total cash coming in", font=f_small, fill=TEXT_DARK)
        
        # Equals symbol
        draw.text((bx2 + 480, by + 90), "=", font=f_kpi_huge, fill=TEXT_WHITE)
        
        # Card Net Burn (Highlighted)
        bx3 = bx2 + 550
        burn_val = int(15000 * ease_in_out_quad(t))
        draw.rounded_rectangle([bx3, by, bx3 + 460, by + 240], radius=18, fill=CARD_BG, outline=ROSE, width=3)
        draw_pill(draw, (bx3 + 35, by + 30), "NET CASH DRAIN", f_small_bold, ROSE, (60, 15, 25), ROSE, 10, 4)
        draw.text((bx3 + 35, by + 85), f"${burn_val:,.0f} / mo", font=f_kpi_val, fill=ROSE)
        draw.text((bx3 + 35, by + 175), "Net reduction per month", font=f_small, fill=TEXT_MUTED)
        
        # Bottom insight note
        draw_pill(draw, (180, 760), "💡 If revenue > expenses, Net Burn is negative: your business is cash-flow positive and Default Alive!", f_body, SKY, (15, 30, 50), SKY, 24, 12)

    # ==================== SCENE 4: STEP 4 - RUNWAY FORECAST (24 - 31s, 720 - 930) ====================
    elif 720 <= frame_idx < 930:
        local_f = frame_idx - 720
        t = min(1.0, local_f / 50.0)
        runway_months = 16.7 * ease_in_out_quad(t)
        
        draw_pill(draw, (180, 140), "STEP 4 OF 6", f_small_bold, INDIGO_LIGHT, INDIGO_BG, INDIGO, 16, 6)
        draw.text((180, 190), "Instant Real-Time Cash Runway Forecast", font=f_title, fill=TEXT_WHITE)
        draw.text((180, 255), "Formula: Total Available Cash ($250k) ÷ Net Monthly Burn ($15k/mo)", font=f_body, fill=TEXT_MUTED)
        
        # Hero KPI Card
        hx, hy, hw, hh = 180, 320, 1000, 420
        draw.rounded_rectangle([hx, hy, hx + hw, hy + hh], radius=24, fill=(24, 30, 52), outline=INDIGO, width=3)
        draw.text((hx + 50, hy + 45), "PROJECTED BUSINESS RUNWAY", font=f_small_bold, fill=TEXT_MUTED)
        
        # Big Number
        draw.text((hx + 50, hy + 105), f"{runway_months:.1f}", font=ImageFont.truetype(FONT_BOLD, 130), fill=TEXT_WHITE)
        draw.text((hx + 380, hy + 160), "MONTHS", font=f_title, fill=INDIGO_LIGHT)
        
        # Health status pill
        draw_pill(draw, (hx + 50, hy + 280), "● HEALTHY SOLVENCY ZONE (12 – 18 Months)", f_body_bold, EMERALD, EMERALD_BG, EMERALD, 18, 10)
        draw.text((hx + 50, hy + 355), "Sufficient runway to execute product milestones and plan next capital raise.", font=f_small, fill=TEXT_MUTED)
        
        # Right Metric Breakdown Card
        rx, ry, rw, rh = 1220, 320, 520, 420
        draw.rounded_rectangle([rx, ry, rx + rw, ry + rh], radius=24, fill=CARD_BG, outline=CARD_BORDER, width=2)
        draw.text((rx + 40, ry + 40), "Trajectory Key Metrics", font=f_h2, fill=TEXT_WHITE)
        
        metrics = [
            ("Starting Balance:", "$250,000", TEXT_WHITE),
            ("Net Monthly Burn:", "$15,000", ROSE),
            ("Depletion Date:", "~17 Months Out", SKY),
            ("Zero Cash Risk:", "LOW (Immediate)", EMERALD),
        ]
        my = ry + 110
        for m_lbl, m_val, m_col in metrics:
            draw.text((rx + 40, my), m_lbl, font=f_body, fill=TEXT_MUTED)
            draw.text((rx + rw - 40 - f_body_bold.getbbox(m_val)[2], my), m_val, font=f_body_bold, fill=m_col)
            my += 60
            draw.line([(rx + 40, my - 15), (rx + rw - 40, my - 15)], fill=CARD_BORDER, width=1)

    # ==================== SCENE 5: STEP 5 - TRAJECTORY CHART (31 - 37s, 930 - 1110) ====================
    elif 930 <= frame_idx < 1110:
        local_f = frame_idx - 930
        t = min(1.0, local_f / 50.0)
        
        draw_pill(draw, (180, 140), "STEP 5 OF 6", f_small_bold, INDIGO_LIGHT, INDIGO_BG, INDIGO, 16, 6)
        draw.text((180, 190), "Burn-Down Trajectory Chart & Milestones", font=f_title, fill=TEXT_WHITE)
        draw.text((180, 255), "Track projected cash balance at every future month until the zero-cash boundary.", font=f_body, fill=TEXT_MUTED)
        
        # Chart Container Card
        cx, cy, cw, ch = 180, 320, 1560, 440
        draw.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=24, fill=CARD_BG, outline=CARD_BORDER, width=2)
        
        # Grid lines
        chart_x1, chart_x2 = cx + 120, cx + cw - 120
        chart_y1, chart_y2 = cy + 60, cy + ch - 80
        
        # Horizontal lines (Y axis)
        y_labels = [("$250k", 0), ("$150k", 0.4), ("$50k", 0.8), ("$0", 1.0)]
        for y_lbl, y_pct in y_labels:
            ly = chart_y1 + y_pct * (chart_y2 - chart_y1)
            draw.line([(chart_x1, ly), (chart_x2, ly)], fill=(28, 38, 62), width=1)
            draw.text((cx + 40, ly - 10), y_lbl, font=f_small, fill=TEXT_DARK)
            
        # Draw linear trajectory line
        max_months = 16.7
        progress_months = max_months * t
        
        # Generate chart points
        num_pts = 40
        pts = []
        for p in range(num_pts + 1):
            m = (p / num_pts) * progress_months
            px = chart_x1 + (m / max_months) * (chart_x2 - chart_x1)
            cash_left = max(0, 250000 - m * 15000)
            py = chart_y1 + (1.0 - (cash_left / 250000)) * (chart_y2 - chart_y1)
            pts.append((px, py))
            
        # Draw area under curve
        if len(pts) > 1:
            poly_pts = [(chart_x1, chart_y2)] + pts + [(pts[-1][0], chart_y2)]
            # Draw line segments
            for i in range(len(pts) - 1):
                draw.line([pts[i], pts[i+1]], fill=INDIGO, width=4)
                
            # Current tip marker
            tip = pts[-1]
            draw.ellipse([(tip[0] - 8, tip[1] - 8), (tip[0] + 8, tip[1] + 8)], fill=TEXT_WHITE, outline=INDIGO, width=3)
            
            # Checkpoint labels if reached
            if progress_months >= 6:
                m6_x = chart_x1 + (6 / max_months) * (chart_x2 - chart_x1)
                m6_y = chart_y1 + (1.0 - (160000 / 250000)) * (chart_y2 - chart_y1)
                draw.ellipse([(m6_x - 6, m6_y - 6), (m6_x + 6, m6_y + 6)], fill=SKY)
                draw.text((m6_x - 40, m6_y - 35), "M6: $160k", font=f_small_bold, fill=SKY)
                
            if progress_months >= 12:
                m12_x = chart_x1 + (12 / max_months) * (chart_x2 - chart_x1)
                m12_y = chart_y1 + (1.0 - (70000 / 250000)) * (chart_y2 - chart_y1)
                draw.ellipse([(m12_x - 6, m12_y - 6), (m12_x + 6, m12_y + 6)], fill=AMBER)
                draw.text((m12_x - 40, m12_y - 35), "M12: $70k", font=f_small_bold, fill=AMBER)
                
            if t >= 0.95:
                # Zero cash depletion pin
                draw_pill(draw, (chart_x2 - 320, chart_y2 - 60), "⚠️ Zero Cash: ~16.7 Months", f_small_bold, ROSE, (60, 15, 25), ROSE, 14, 8)
                
        # X Axis month labels
        draw.text((chart_x1, chart_y2 + 20), "Today (M0)", font=f_small, fill=TEXT_MUTED)
        draw.text((chart_x1 + 0.36 * (chart_x2 - chart_x1), chart_y2 + 20), "Month 6", font=f_small, fill=TEXT_MUTED)
        draw.text((chart_x1 + 0.72 * (chart_x2 - chart_x1), chart_y2 + 20), "Month 12", font=f_small, fill=TEXT_MUTED)
        draw.text((chart_x2 - 100, chart_y2 + 20), "Month 16.7 (Out)", font=f_small_bold, fill=ROSE)

    # ==================== SCENE 6: STEP 6 - WHAT-IF SCENARIOS (37 - 42s, 1110 - 1260) ====================
    elif frame_idx >= 1110:
        local_f = frame_idx - 1110
        t = min(1.0, local_f / 40.0)
        
        draw_pill(draw, (180, 140), "STEP 6 OF 6", f_small_bold, INDIGO_LIGHT, INDIGO_BG, INDIGO, 16, 6)
        draw.text((180, 190), "Interactive Scenario Planning & Runway Extension", font=f_title, fill=TEXT_WHITE)
        draw.text((180, 255), "Simulate headcount additions, cost reductions, or growth acceleration.", font=f_body, fill=TEXT_MUTED)
        
        # Scenario Comparison Cards
        sc_w = 750
        # Baseline Card
        bx = 180
        by = 320
        draw.rounded_rectangle([bx, by, bx + sc_w, by + 340], radius=20, fill=CARD_BG, outline=CARD_BORDER, width=2)
        draw_pill(draw, (bx + 40, by + 35), "CURRENT BASELINE", f_small_bold, TEXT_MUTED, (25, 35, 55), CARD_BORDER, 12, 5)
        draw.text((bx + 40, by + 85), "Current Trajectory", font=f_h2, fill=TEXT_WHITE)
        draw.text((bx + 40, by + 140), "16.7 Months", font=f_kpi_huge, fill=TEXT_WHITE)
        draw.text((bx + 40, by + 260), "Gross: $25k/mo  |  Revenue: $10k/mo  |  Net: $15k/mo", font=f_body, fill=TEXT_MUTED)
        
        # New Scenario Card: 20% Cost Cut
        sx2 = 990
        sy2 = 320
        anim_runway = 16.7 + (25.0 - 16.7) * ease_in_out_quad(t)
        draw.rounded_rectangle([sx2, sy2, sx2 + sc_w, sy2 + 340], radius=20, fill=(20, 35, 45), outline=EMERALD, width=3)
        draw_pill(draw, (sx2 + 40, sy2 + 35), "SCENARIO: 20% COST REDUCTION", f_small_bold, EMERALD, EMERALD_BG, EMERALD, 12, 5)
        draw.text((sx2 + 40, sy2 + 85), "Optimized Trajectory", font=f_h2, fill=TEXT_WHITE)
        draw.text((sx2 + 40, sy2 + 140), f"{anim_runway:.1f} Months", font=f_kpi_huge, fill=EMERALD)
        draw_pill(draw, (sx2 + 40, sy2 + 255), "+8.3 Months Added to Solvency!", f_body_bold, EMERALD, (10, 60, 40), EMERALD, 16, 8)
        
        # Outro call to action banner
        ox, oy, ow, oh = 180, 690, 1560, 120
        draw.rounded_rectangle([ox, oy, ox + ow, oy + oh], radius=16, fill=(24, 30, 60), outline=INDIGO, width=2)
        draw.text((ox + 50, oy + 42), "⚡ Try it now free on RunwayCalculator.dev  ·  100% Private  ·  Zero Sign-Up Required", font=f_h2, fill=TEXT_WHITE)
        
    return img

def generate_video():
    print(f"Starting video generation: {TOTAL_FRAMES} frames ({TOTAL_SECONDS}s @ {FPS}fps)")
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    
    # 1. Generate MP4 via piped rawvideo
    print("Encoding MP4 (H.264 / faststart)...")
    mp4_cmd = [
        ffmpeg_exe, "-y",
        "-f", "rawvideo",
        "-pix_fmt", "rgb24",
        "-s", f"{WIDTH}x{HEIGHT}",
        "-r", str(FPS),
        "-i", "-",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "medium",
        "-crf", "20",
        "-movflags", "+faststart",
        MP4_PATH
    ]
    
    proc = subprocess.Popen(mp4_cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
    poster_frame_idx = 800  # Hero Runway Forecast KPI frame
    poster_img = None
    
    for f in range(TOTAL_FRAMES):
        img = render_frame(f)
        if f == poster_frame_idx:
            poster_img = img
        proc.stdin.write(img.tobytes())
        if f % 150 == 0:
            print(f"  Rendered {f}/{TOTAL_FRAMES} frames ({(f/TOTAL_FRAMES)*100:.1f}%)")
            
    proc.stdin.close()
    proc.wait()
    print("MP4 encoded successfully!")
    
    # 2. Save high-res poster
    print("Saving video poster thumbnail...")
    if poster_img:
        poster_img.save(POSTER_PATH, "JPEG", quality=92)
    else:
        render_frame(poster_frame_idx).save(POSTER_PATH, "JPEG", quality=92)
    print(f"Poster saved to {POSTER_PATH}")
    
    # 3. Generate WebM version
    print("Encoding WebM (VP9)...")
    webm_cmd = [
        ffmpeg_exe, "-y",
        "-i", MP4_PATH,
        "-c:v", "libvpx-vp9",
        "-b:v", "0",
        "-crf", "32",
        "-cpu-used", "4",
        WEBM_PATH
    ]
    subprocess.run(webm_cmd, check=True)
    print("WebM encoded successfully!")
    
    # 4. Generate WebVTT Captions file
    print("Writing WebVTT captions...")
    vtt_content = """WEBVTT - How Runway Calculator Works

00:00.000 --> 00:05.000
Welcome to Runway Calculator: calculate your startup cash runway, burn rate, and solvency in minutes.

00:05.000 --> 00:11.000
Step 1: Enter your total liquid cash reserves, including bank balances and easily accessible treasury accounts.

00:11.000 --> 00:17.000
Step 2: Input your monthly gross expenses such as payroll and servers, alongside monthly collected cash revenue.

00:17.000 --> 00:24.000
Step 3: Our engine calculates net monthly burn by subtracting revenue from gross expenses to find your true cash drain.

00:24.000 --> 00:31.000
Step 4: Real-time runway forecasting reveals exact months of cash left and highlights your financial health zone.

00:31.000 --> 00:37.000
Step 5: Review the visual burn-down trajectory chart and pinpoint your projected zero-cash depletion date.

00:37.000 --> 00:42.000
Step 6: Model what-if scenarios such as hiring or expense cuts to extend your runway. 100% private at runwaycalculator.dev.
"""
    with open(VTT_PATH, "w", encoding="utf-8") as vf:
        vf.write(vtt_content)
    print(f"WebVTT written to {VTT_PATH}")

if __name__ == "__main__":
    generate_video()
