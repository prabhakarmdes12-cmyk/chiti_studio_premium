# Nova - Adaptive Cinematic Concierge

Nova is now integrated into chiti-studio-premium. Follow these steps to complete the setup.

## 1. Install Dependencies

```bash
cd chiti-studio-premium
npm install zustand
```

## 2. Add Videos

Place your video files in `public/nova/videos/`:

```
public/
└── nova/
    └── videos/
        ├── welcome.mp4        # Welcome video (4-5s)
        ├── thinking.mp4       # Thinking/transition (2-3s)
        ├── acknowledgement.mp4 # Acknowledgment (2-3s)
        ├── approval.mp4       # High-value signal (2-3s)
        └── closing.mp4         # Closing (4-5s)
```

## 3. Run Development Server

```bash
npm run dev
```

## Features Implemented

- Floating sphere trigger (bottom-right)
- Video-driven conversation flow
- Lead qualification scoring
- Glassmorphism UI design
- Zustand state management
- API endpoint for lead capture

## Customize Flow

Edit `src/data/conversation.json` to modify:
- Questions and options
- Video URLs
- Conversation flow
- Lead scoring logic

## API Endpoint

Leads are submitted to: `POST /api/lead`

Current implementation logs leads to console. To add email notifications, integrate Resend or Nodemailer in `src/app/api/lead/route.ts`.