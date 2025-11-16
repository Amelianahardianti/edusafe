import NotificationSaranPage from "@/app/components/userPage/NotificationSaranPage";

const notifications = [
  {
    id: 1,
    headline: "🎉 New Feature Alert: Dark Mode Available!",
    body: "You can now switch to the sleek new dark mode theme in your settings. Give your eyes a break!",
  },
  {
    id: 2,
    headline: "💰 Your Monthly Report is Ready",
    body: "Check out your personalized financial summary for October. Great progress on your savings goals!",
  },
  {
    id: 3,
    headline: "📝 Action Required: Update Your Password",
    body: "For security reasons, we recommend updating your password. This ensures the continued protection of your account.",
  },
  {
    id: 4,
    headline: "🛠 System Maintenance Tonight at 2 AM",
    body: "We are performing scheduled maintenance to improve performance. The site may be unavailable for a brief period.",
  },
  {
    id: 5,
    headline: "⭐ You've Earned a New Badge!",
    body: "Congratulations! You've unlocked the 'Early Bird' badge for completing a task before 9 AM.",
  },
];

export default function Notifikasi() {
  return (
    <div className="flex flex-col items-center gap-y-[2vh] py-[5vh]">
      {notifications.map((notification) => (
        <NotificationSaranPage
          key={notification.id}
          headline={notification.headline}
          text={notification.body}
        />
      ))}
    </div>
  );
}
