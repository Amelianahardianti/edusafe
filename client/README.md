# EduSafe Frontend - Next.js Client

Frontend aplikasi EduSafe menggunakan Next.js 16, Tailwind CSS, dan Framer Motion.

## 🚀 Setup

1. **Install dependencies:**
```bash
cd client
npm install
```

2. **Setup environment variables:**
Buat file `.env.local` di folder `client`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

3. **Jalankan development server:**
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 📁 Struktur Project

```
client/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard pages (admin, teacher, parent)
│   ├── login/             # Login page
│   ├── layout.js          # Root layout dengan AuthProvider
│   ├── page.js            # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Button.js
│   ├── Card.js
│   ├── Input.js
│   ├── Loading.js
│   └── DashboardLayout.js
├── contexts/              # React contexts
│   └── AuthContext.js     # Authentication context
├── lib/                   # Utilities & API client
│   └── api.js            # API client untuk backend
└── middleware.js          # Next.js middleware
```

## 🎨 Tech Stack

- **Next.js 16** - React framework dengan App Router
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **JavaScript** - No TypeScript

## 🔑 Fitur

- ✅ Authentication dengan JWT
- ✅ Role-based routing (Admin, Teacher, Parent)
- ✅ API client untuk semua endpoint backend
- ✅ Reusable components dengan Framer Motion animations
- ✅ Responsive design dengan Tailwind CSS

## 📝 API Client

Semua API functions tersedia di `lib/api.js`:
- `authAPI` - Login, me, changePassword
- `usersAPI` - CRUD users (admin only)
- `childrenAPI` - CRUD children
- `classesAPI` - CRUD classes
- `attendanceAPI` - Attendance management
- `activityAPI` - Activity logs
- `broadcastAPI` - Broadcast/announcements
- `feedbackAPI` - Feedback management
- `weatherAPI` - Weather forecast
- `notificationsAPI` - System notifications

## 🎯 Next Steps

1. Buat halaman-halaman untuk setiap fitur (users, children, classes, dll)
2. Implementasi form untuk CRUD operations
3. Tambahkan error handling yang lebih baik
4. Tambahkan loading states
5. Implementasi real-time updates (optional)

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
