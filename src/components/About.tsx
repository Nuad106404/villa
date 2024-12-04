import React from 'react';
import { Star, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800"
              alt="Luxury hotel interior"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-8 -right-8 bg-amber-400 p-6 rounded-lg shadow-xl">
              <div className="text-black text-center">
                <div className="text-4xl font-bold">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-4xl text-gray-900">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed">
              For over 15 years, we've been curating exceptional stays in the world's most coveted destinations. Our collection of luxury hotels and private villas represents the pinnacle of sophistication and comfort.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Stat
                icon={<Star className="w-6 h-6 text-amber-400" />}
                title="5-Star Rating"
                description="Consistently rated excellent"
              />
              <Stat
                icon={<Award className="w-6 h-6 text-amber-400" />}
                title="Best in Class"
                description="Award-winning service"
              />
              <Stat
                icon={<Users className="w-6 h-6 text-amber-400" />}
                title="10K+ Guests"
                description="Happy customers"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Stat = ({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="text-center p-4 rounded-lg bg-gray-50">
    <div className="flex justify-center mb-2">{icon}</div>
    <h3 className="font-semibold text-gray-900">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);