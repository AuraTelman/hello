# Expense Tracker - UI Design

## Desktop View (Main Layout)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                        💰 Expense Tracker                                │
│                    Track expenses with AI magic                          │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                         ┌─────────────────────┐                         │
│                         │   📸  UPLOAD ICON   │                         │
│                         └─────────────────────┘                         │
│                                                                          │
│                   Drag & Drop Receipt Image Here                        │
│                                                                          │
│                         or click to browse                              │
│                                                                          │
│                    [ Supports JPG, PNG files ]                          │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
                                    ↓
                          UPLOAD ZONE (Main Focus)
                          - Large, prominent area
                          - Dashed border (indicates drop zone)
                          - Centered text and icon
                          - Changes color on hover/drag


┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  Your Expenses (12)                                      Total: $847.50 │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │  🏪 Whole Foods Market                             🗑️               │ │
│  │  $42.50                                                             │ │
│  │  Oct 3, 2025                                                        │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │  🍕 Pizza Palace                                   🗑️               │ │
│  │  $28.75                                                             │ │
│  │  Oct 2, 2025                                                        │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │  ⛽ Shell Gas Station                              🗑️               │ │
│  │  $65.00                                                             │ │
│  │  Oct 1, 2025                                                        │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
                                    ↓
                            EXPENSE LIST
                            - Cards with subtle shadows
                            - Most recent first
                            - Delete button on right
                            - Clean spacing between cards
```

---

## Component Breakdown

### 1. Header Component
```
┌────────────────────────────────────────────────────────────┐
│                   💰 Expense Tracker                       │
│               Track expenses with AI magic                 │
└────────────────────────────────────────────────────────────┘

Elements:
- App icon/emoji (💰)
- App name (large, bold)
- Tagline (smaller, muted color)
- Background: gradient or solid color
- Padding: generous (60px top/bottom)
```

### 2. Upload Zone Component (Default State)
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│                    ┌──────────────┐                     │
│                    │              │                     │
│                    │   📸 ICON    │                     │
│                    │   (large)    │                     │
│                    │              │                     │
│                    └──────────────┘                     │
│                                                          │
│              Drag & Drop Receipt Image Here             │
│                                                          │
│                    or click to browse                   │
│                                                          │
│               [ Supports JPG, PNG files ]               │
│                                                          │
└──────────────────────────────────────────────────────────┘

Style:
- Dashed border (2px, #ddd)
- Border radius: 12px
- Background: light gray (#f9fafb)
- Padding: 80px vertical
- Cursor: pointer
- Hover: border color changes to blue
```

### 3. Upload Zone (Drag Over State)
```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║                    ┌──────────────┐                     ║
║                    │              │                     ║
║                    │   ⬇️  ICON   │                     ║
║                    │   (large)    │                     ║
║                    │              │                     ║
║                    └──────────────┘                     ║
║                                                          ║
║                   Drop receipt here!                    ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝

Style:
- Solid border (3px, blue)
- Background: light blue tint
- Border animation (subtle pulse)
- Icon changes to arrow down
```

### 4. Upload Zone (Processing State)
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│                    ┌──────────────┐                     │
│                    │              │                     │
│                    │   ⏳ LOADING │                     │
│                    │   (spinner)  │                     │
│                    │              │                     │
│                    └──────────────┘                     │
│                                                          │
│               Processing your receipt...                │
│                                                          │
│               This usually takes 5-10 seconds           │
│                                                          │
└──────────────────────────────────────────────────────────┘

Style:
- Border changes to solid gray
- Loading spinner animation
- Text color: muted
- Non-interactive (pointer-events: none)
```

### 5. Expense List Header
```
┌──────────────────────────────────────────────────────────┐
│  Your Expenses (12)                  Total: $847.50      │
└──────────────────────────────────────────────────────────┘

Elements:
- Left: "Your Expenses" + count badge
- Right: Total amount (bold, large)
- Divider line below
- Padding: 20px
- Background: white or light gray
```

### 6. Expense Card Component
```
┌────────────────────────────────────────────────────────────┐
│  🏪 Whole Foods Market                              🗑️    │
│  $42.50 USD                                               │
│  Oct 3, 2025                                              │
└────────────────────────────────────────────────────────────┘

Layout:
┌────────────────────────────────────────────────────────────┐
│  [Icon] [Merchant Name]                      [Delete Btn] │
│         [Amount] [Currency]                               │
│         [Date]                                            │
└────────────────────────────────────────────────────────────┘

Style:
- Background: white
- Border: 1px solid #e5e7eb
- Border radius: 8px
- Padding: 20px
- Margin bottom: 16px
- Box shadow: subtle (0 1px 3px rgba(0,0,0,0.1))
- Hover: shadow increases slightly

Delete Button:
- Icon: 🗑️ or trash icon
- Position: absolute right
- Hover: red color
- Click: confirmation dialog
```

---

## Empty State (No Expenses Yet)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                         💰 Expense Tracker                               │
│                     Track expenses with AI magic                         │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                         ┌─────────────────────┐                         │
│                         │      📸 ICON        │                         │
│                         └─────────────────────┘                         │
│                                                                          │
│                   Drag & Drop Receipt Image Here                        │
│                                                                          │
│                         or click to browse                              │
│                                                                          │
│                    [ Supports JPG, PNG files ]                          │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                         📭 No expenses yet                               │
│                                                                          │
│                  Upload your first receipt to get started!              │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

Note: Empty state uses large icon and encouraging message
```

---

## Mobile View (< 768px)

```
┌─────────────────────────────┐
│                             │
│      💰 Expense Tracker     │
│   Track expenses with AI    │
│                             │
└─────────────────────────────┘

┌─────────────────────────────┐
│                             │
│      ┌────────────┐         │
│      │   📸 ICON  │         │
│      └────────────┘         │
│                             │
│  Drag & Drop Receipt Here  │
│                             │
│     or click to browse      │
│                             │
│   [ Supports JPG, PNG ]    │
│                             │
└─────────────────────────────┘

┌─────────────────────────────┐
│                             │
│ Your Expenses (12)          │
│ Total: $847.50              │
│                             │
├─────────────────────────────┤
│                             │
│ ┌─────────────────────────┐ │
│ │ 🏪 Whole Foods     🗑️   │ │
│ │ $42.50                  │ │
│ │ Oct 3, 2025             │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ 🍕 Pizza Palace    🗑️   │ │
│ │ $28.75                  │ │
│ │ Oct 2, 2025             │ │
│ └─────────────────────────┘ │
│                             │
└─────────────────────────────┘

Changes for Mobile:
- Single column layout
- Reduced padding (40px → 24px)
- Smaller text sizes
- Stack header total below count
- Touch-friendly buttons (min 44px)
```

---

## Color Palette

```
Primary Colors:
┌─────────────────────────────────────────────────┐
│ Primary Blue:   #3B82F6  ████████              │
│ Primary Hover:  #2563EB  ████████              │
│ Success Green:  #10B981  ████████              │
│ Error Red:      #EF4444  ████████              │
└─────────────────────────────────────────────────┘

Neutrals:
┌─────────────────────────────────────────────────┐
│ Background:     #F9FAFB  ████████              │
│ Card White:     #FFFFFF  ████████              │
│ Border Gray:    #E5E7EB  ████████              │
│ Text Dark:      #111827  ████████              │
│ Text Muted:     #6B7280  ████████              │
└─────────────────────────────────────────────────┘
```

---

## Typography

```
Heading (App Name):
- Font: Inter, SF Pro, -apple-system
- Size: 32px (mobile: 24px)
- Weight: 700 (bold)
- Color: #111827

Subheading (Tagline):
- Size: 16px (mobile: 14px)
- Weight: 400 (regular)
- Color: #6B7280

Upload Zone Text:
- Size: 18px (mobile: 16px)
- Weight: 500 (medium)
- Color: #374151

Merchant Name:
- Size: 18px (mobile: 16px)
- Weight: 600 (semibold)
- Color: #111827

Amount:
- Size: 20px (mobile: 18px)
- Weight: 700 (bold)
- Color: #111827

Date:
- Size: 14px (mobile: 13px)
- Weight: 400 (regular)
- Color: #6B7280
```

---

## Spacing System

```
Container:
┌─────────────────────────────────────┐
│ ←─── max-width: 1200px ───→        │
│                                     │
│ ←padding→  Content  ←padding→      │
│   24px                 24px         │
└─────────────────────────────────────┘

Vertical Spacing:
Header → Upload:        40px
Upload → List:          60px
List Items:             16px
Section Padding:        24px

Card Internal Spacing:
Top/Bottom:            20px
Left/Right:            20px
Between Elements:      8px
```

---

## Interactions & States

### Upload Zone States
```
1. Default (Idle)
   ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
        Dashed border
        Gray background
   └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘

2. Hover
   ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
        Dashed border (blue)
        Cursor: pointer
   └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘

3. Drag Over
   ╔═══════════════════════╗
   ║   Solid border (blue) ║
   ║   Light blue bg       ║
   ╚═══════════════════════╝

4. Processing
   ┌───────────────────────┐
   │   Loading spinner     │
   │   Disabled state      │
   └───────────────────────┘

5. Error
   ┌───────────────────────┐
   │   Red border          │
   │   Error message       │
   └───────────────────────┘
```

### Expense Card Interactions
```
1. Default
   ┌─────────────────────┐
   │  Normal state       │
   │  Subtle shadow      │
   └─────────────────────┘

2. Hover
   ┌─────────────────────┐
   │  Elevated shadow    │
   │  Slight lift        │
   └─────────────────────┘

3. Delete Button Hover
   ┌─────────────────────┐
   │  Merchant      [🗑️] │← Red on hover
   └─────────────────────┘

4. Delete Confirmation
   ┌─────────────────────────────┐
   │  Delete this expense?       │
   │  [Cancel]  [Delete]         │
   └─────────────────────────────┘
```

---

## Success Toast Notification

```
                ┌─────────────────────────────────┐
                │  ✅  Expense added successfully │
                └─────────────────────────────────┘
                         ↑
                  Position: top-right
                  Duration: 3 seconds
                  Animation: slide in + fade out
```

## Error Toast Notification

```
                ┌─────────────────────────────────┐
                │  ❌  Failed to extract data     │
                │      Please try another receipt │
                └─────────────────────────────────┘
                         ↑
                  Position: top-right
                  Duration: 5 seconds
                  Background: red
```

---

## Accessibility Notes

```
✓ Upload zone has proper ARIA labels
✓ Delete buttons have "Delete [Merchant]" labels
✓ Focus states visible on all interactive elements
✓ Color contrast meets WCAG AA standards
✓ Keyboard navigation supported (Tab, Enter, Escape)
✓ Loading states announced to screen readers
✓ Error messages linked to form elements
```

---

## Animation Guidelines

```
Upload Zone:
- Border color transition: 200ms ease
- Background color transition: 200ms ease
- Drag over: scale(1.02) in 150ms

Expense Cards:
- Appear: fade in + slide up (300ms)
- Delete: fade out + slide left (200ms)
- Hover: shadow transition (150ms)

Loading Spinner:
- Rotate: 1s linear infinite
- Size: 48px
- Color: Primary blue

Toast Notifications:
- Enter: slide right + fade in (300ms)
- Exit: fade out (200ms)
- Delay before exit: 3-5 seconds
```

---

## Responsive Breakpoints

```
Desktop (> 1024px):
- Max width: 1200px
- Upload zone: Full width
- Expense cards: Full width
- Padding: 24px

Tablet (768px - 1024px):
- Max width: 768px
- Upload zone: Full width
- Expense cards: Full width
- Padding: 20px

Mobile (< 768px):
- Max width: 100%
- Upload zone: Full width
- Expense cards: Full width
- Padding: 16px
- Font sizes: reduced 10-15%
```

---

## Implementation Priority

```
Phase 1 - Core Layout:
✓ Header component
✓ Upload zone (default state)
✓ Expense card component
✓ Basic responsive layout

Phase 2 - Interactions:
✓ Drag & drop functionality
✓ Loading states
✓ Delete confirmation
✓ Toast notifications

Phase 3 - Polish:
✓ Animations
✓ Hover effects
✓ Empty states
✓ Error states
✓ Accessibility improvements
```

---

## Design Principles

1. **Clarity First**: Large, obvious upload zone - no confusion about what to do
2. **Instant Feedback**: Every action gets immediate visual response
3. **Minimal Cognitive Load**: No unnecessary options or decisions
4. **Progressive Disclosure**: Show only what's needed, when it's needed
5. **Mobile-First Thinking**: Touch-friendly, readable on small screens
6. **Forgiving**: Easy to recover from mistakes (delete confirmation)
7. **Delightful**: Smooth animations, clean aesthetics, satisfying interactions

**Remember**: The magic is in the simplicity. Every pixel serves a purpose.


