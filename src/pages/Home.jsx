// src/pages/Home.jsx
import React from 'react';
import FeatureCard from '../components/Home/FeatureCard.jsx';
import Button from '../components/Button.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PricingCard from '../components/Home/PricingCard.jsx';
import FeedbackCard from '../components/Home/FeedbackCard.jsx';
import LearningStatisticsCard from '../components/StatisticsCard.jsx';
import RecentResultsCard from '../components/Home/RecentResultsCard.jsx';
import banner from '../assets/images/banner.png';
import feedback_1 from '../assets/images/feedback_1.jpg';
import feedback_2 from '../assets/images/feedback_2.jpg';
import feedback_3 from '../assets/images/feedback_3.jpg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const sectionData = {
  banner: {
    title: 'Học Tiếng Anh hiệu quả cùng EnglishMastery',
    description: 'Luyện thi, từ vựng, và kỹ năng Tiếng Anh mọi lúc, mọi nơi',
    buttonText: 'Bắt đầu ngay',
    image: banner,
  },
  userWelcome: {
    message: 'Tiếp tục hành trình học Tiếng Anh của bạn ngay hôm nay.',
    buttonText: 'Làm bài thi ngay',
    statistics: [
      {
        icon: <FontAwesomeIcon icon="fa-solid fa-file" size="5x" style={{ color: '#2C99E2' }} />,
        value: '5',
        description: 'Đề thi đã làm',
      },
      {
        icon: <FontAwesomeIcon icon="fa-solid fa-star" size="5x" style={{ color: '#2C99E2' }} />,
        value: '600/990',
        description: 'Điểm trung bình',
      },
      {
        icon: <FontAwesomeIcon icon="fa-solid fa-cube" size="5x" style={{ color: '#2C99E2' }} />,
        value: 'Lifetime',
        description: 'Gói học đã mua',
      },
    ],
  },
  features: [
    {
      icon: <FontAwesomeIcon icon="fa-solid fa-file" size="2xl" style={{ color: '#2C99E2' }} />,
      title: 'Luyện đề chuẩn quốc tế',
      description: 'Hơn 500 đề thi từ cơ bản đến nâng cao',
      path: '/exam'
    },
    {
      icon: <FontAwesomeIcon icon="fa-solid fa-book-open" size="2xl" style={{ color: '#2C99E2' }} />,
      title: 'Tra từ điển thông minh',
      description: 'Học từ vựng, phát âm và từ đồng nghĩa',
      path: '/dictionary'
    },
    {
      icon: <FontAwesomeIcon icon="fa-solid fa-pen-to-square" size="2xl" style={{ color: '#2C99E2' }} />,
      title: 'Ghi chú cá nhân hóa',
      description: 'Lưu trữ và quản lý ghi chú dễ dàng',
      path: '/note'
    },
  ],
  feedbacks: [
    {
      name: 'Anhdaden',
      message: 'Nền tảng rất hữu ích, tôi đã cải thiện điểm thi đáng kể!',
      avatar: feedback_1,
    },
    {
      name: 'batocom',
      message: 'Từ điển thông minh giúp tôi học từ vựng nhanh hơn rất nhiều!',
      avatar: feedback_2,
    },
    {
      name: 'anhhai',
      message: 'Giao diện dễ sử dụng, nội dung phong phú, rất đáng để đầu tư!',
      avatar: feedback_3,
    },
  ],
  cta: {
    title: 'Sẵn sàng chinh phục Tiếng Anh?',
    buttonText: 'Đăng ký ngay',
  },
  recentResults: [
    { id: 1, score: 600, total: 990, date: '01/04/2025' },
    { id: 2, score: 700, total: 990, date: '25/04/2025' },
    { id: 3, score: 500, total: 990, date: '30/04/2025' },
  ],
};

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <main className="flex flex-col space-y-16">
      {/* Banner Section */}
      <section className="py-16 bg-gradient-to-b from-[#E6F0FA] to-white">
        {!isLoggedIn ? (
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-7 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight">{sectionData.banner.title}</h1>
              <p className="text-gray-600 font-medium">{sectionData.banner.description}</p>
              <Link to="/login">
                <Button text={sectionData.banner.buttonText} variant="primary" size="md" />
              </Link>
            </div>
            <div className="h-75 md:h-80">
              <img src={sectionData.banner.image} alt="" className="object-cover rounded-3xl" />
            </div>
          </div>
        ) : (
          /* User Welcome Section */
          <>
            <div className="container mx-auto px-4 grid md:grid-cols-1 gap-8 items-center">
              <div className="space-y-6 flex flex-col justify-center items-center">
                <h1 className="text-4xl text-center font-bold leading-tight">
                  Chào mừng bạn trở lại, {userInfo?.userName || 'User'}!
                </h1>
                <p className="text-gray-600">{sectionData.userWelcome.message}</p>
                <Button text={sectionData.userWelcome.buttonText} variant="primary" size="md" />
              </div>
            </div>
            <div className="container mx-auto px-4 mt-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center items-center">
                {sectionData.userWelcome.statistics.map((stat, index) => (
                  <LearningStatisticsCard
                    key={index}
                    icon={stat.icon}
                    value={stat.value}
                    description={stat.description}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      {/* Recent Result Section */}
      {isLoggedIn && (
        <section className="py-3">
          <h2 className="text-3xl font-bold text-center mb-10">Kết quả gần đây</h2>
          <div className="container mx-auto px-4">
            <RecentResultsCard data={sectionData.recentResults} />
          </div>
        </section>
      )}

      {/* Feature Section */}
      <section className="py-3">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Khám phá các tính năng nổi bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sectionData.features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                path={feature.path}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-3">
        <PricingCard />
      </section>

      {!isLoggedIn && (
        <>
          {/* Feedback Section */}
          <section className="py-3">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Học viên nói gì về EnglishMastery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {sectionData.feedbacks.map((feedback, index) => (
                  <FeedbackCard
                    key={index}
                    name={feedback.name}
                    message={feedback.message}
                    avatar={feedback.avatar}
                  />
                ))}
              </div>
            </div>
          </section>
          {/* CTA Section */}
          <section className="py-15 bg-[#E6F0FA] flex items-center justify-center">
            <div className="text-center mx-auto px-4 flex-col items-center justify-center">
              <h2 className="text-3xl font-bold mb-6">{sectionData.cta.title}</h2>
              <Link to="/login">
                <Button text={sectionData.cta.buttonText} variant="primary" size="md" />
              </Link>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default Home;