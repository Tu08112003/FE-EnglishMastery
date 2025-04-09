import React from 'react'
import FeatureCard from '../components/FeatureCard.jsx'
import Button from '../components/Button.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PricingCard from '../components/PricingCard.jsx'
import FeedbackCard from '../components/FeedbackCard.jsx'
import banner from '../assets/images/banner.png'
import feedback_1 from '../assets/images/feedback_1.jpg'
import feedback_2 from '../assets/images/feedback_2.jpg'
import feedback_3 from '../assets/images/feedback_3.jpg'
const Home = () => {
  return (
    <main className="flex-col space-y-16">
        <section className="py-16 bg-gradient-to-b from-[#E6F0FA] to-white">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight">Học Tiếng Anh hiệu quả cùng EnglishMastery</h1>
              <p className="text-gray-600">Luyện thi, từ vựng, và kỹ năng Tiếng Anh mọi lúc, mọi nơi</p>
              <Button text="Bắt đầu ngay" variant="primary" size="md"/>
            </div>
            <div className="h-60 md:h-80">
              <img src={banner} alt="" className="object-cover rounded-3xl"/>
            </div>
          </div>
        </section>
        
        {/* FetureCard */}
        <section className='py-5'>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Khám phá các tính năng nổi bật</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              <FeatureCard
                icon={<FontAwesomeIcon icon="fa-solid fa-file" size="2xl" style={{color: "#2C99E2",}}/>}
                title="Luyện đề chuẩn quốc tế"
                description="Hơn 500 đề thi từ cơ bản đến nâng cao"
              />

              <FeatureCard
                icon={<FontAwesomeIcon icon="fa-solid fa-book-open" size="2xl" style={{color: "#2C99E2",}}/>}
                title="Tra từ điển thông minh"
                description="Học từ vựng, phát âm và từ đồng nghĩa"
              />

              <FeatureCard
                icon={<FontAwesomeIcon icon="fa-solid fa-pen-to-square" size="2xl" style={{color: "#2C99E2",}}/>}
                title="Ghi chú cá nhân hóa"
                description="Lưu trữ và quản lý ghi chú dễ dàng"
              />

            </div>
          </div>
        </section>

        {/* PricingCard */}
        <section >
          <PricingCard/>
        </section>

        {/* FeedbackCard */}
        <section className='py-5'>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Học viên nói gì về EnglishMastery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              <FeedbackCard
                name="Anhdaden"
                message="Nền tảng rất hữu ích, tôi đã cải thiện điểm thi đáng kể!"
                avatar={feedback_1}
              />
              
              <FeedbackCard
                name="batocom"
                message="Từ điển thông minh giúp tôi học từ vựng nhanh hơn rất nhiều!"
                avatar={feedback_2}
              />

              <FeedbackCard
                name="anhhai"
                message="Giao diện dễ sử dụng, nội dung phong phú, rất đáng để đầu tư!"
                avatar={feedback_3}
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className='py-15 bg-[#E6F0FA] flex items-center justify-center'>
          <div className="text-center mx-auto px-4 flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-6">Sẵn sàng chinh phục Tiếng Anh?</h2>
            <Button text="Đăng ký ngay" variant="primary" size="md"/>
          </div>
        </section>
      </main>
  )
}

export default Home