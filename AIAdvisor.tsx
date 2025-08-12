import React, { useState } from "react";

interface ApplianceRecommendation {
  type: string;
  brand: string;
  model: string;
  features: string[];
  price: string;
  installation: string;
}

export default function AIAdvisor() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<ApplianceRecommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      id: 'appliance_type',
      question: 'What type of appliance are you looking to install?',
      options: [
        'Oven',
        'Cooktop',
        'Dishwasher',
        'Washing Machine',
        'Dryer',
        'Air Conditioner',
        'Hot Water System'
      ]
    },
    {
      id: 'kitchen_size',
      question: 'What is the size of your installation area?',
      options: [
        'Small (Under 10m²)',
        'Medium (10-20m²)',
        'Large (20-30m²)',
        'Extra Large (30m²+)'
      ]
    },
    {
      id: 'budget',
      question: 'What is your budget range?',
      options: [
        'Under $1,000',
        '$1,000 - $2,500',
        '$2,500 - $5,000',
        'Above $5,000'
      ]
    },
    {
      id: 'features',
      question: 'Which features are most important to you?',
      options: [
        'Energy Efficiency',
        'Smart Technology',
        'Premium Design',
        'Basic Functionality',
        'Easy Maintenance'
      ]
    }
  ];

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
    
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendations();
    }
  };

  const generateRecommendations = async () => {
    setLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock recommendations based on answers
    const mockRecommendations: ApplianceRecommendation[] = [
      {
        type: answers.appliance_type || 'Oven',
        brand: 'Bosch',
        model: 'Serie 8 Pyrolytic Oven',
        features: ['Self-cleaning', 'Touch display', 'Energy efficient'],
        price: '$2,200 - $2,800',
        installation: '2-3 hours professional installation required'
      },
      {
        type: answers.appliance_type || 'Oven',
        brand: 'Miele',
        model: 'ContourLine Oven',
        features: ['Premium design', 'Smart controls', 'Multiple cooking modes'],
        price: '$3,500 - $4,200',
        installation: '2-3 hours professional installation required'
      }
    ];
    
    setRecommendations(mockRecommendations);
    setLoading(false);
  };

  const resetAdvisor = () => {
    setCurrentStep(1);
    setAnswers({});
    setRecommendations([]);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI is analyzing your preferences...</h2>
          <p className="text-gray-600">This will just take a moment</p>
        </div>
      </div>
    );
  }

  if (recommendations.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Your AI Recommendations</h1>
              <p className="text-xl text-gray-600">
                Based on your preferences, here are our top recommendations:
              </p>
            </div>

            <div className="space-y-6 mb-12">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{rec.brand} {rec.model}</h3>
                      <p className="text-gray-600">{rec.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{rec.price}</p>
                      <p className="text-sm text-gray-500">Installation included</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {rec.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-blue-900 mb-1">Installation Information:</h4>
                    <p className="text-blue-800">{rec.installation}</p>
                  </div>

                  <div className="flex gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors">
                      Get Quote
                    </button>
                    <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-md transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={resetAdvisor}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep - 1];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Appliance Advisor</h1>
            <p className="text-xl text-gray-600">
              Answer a few questions and get personalized appliance recommendations
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Question {currentStep} of {questions.length}</span>
              <span className="text-sm text-gray-600">{Math.round((currentStep / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentQuestion.question}</h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(currentQuestion.id, option)}
                  className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <span className="text-gray-900">{option}</span>
                </button>
              ))}
            </div>

            {/* Previous Answers */}
            {Object.keys(answers).length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your answers:</h3>
                <div className="space-y-2">
                  {Object.entries(answers).map(([questionId, answer]) => {
                    const question = questions.find(q => q.id === questionId);
                    return (
                      <div key={questionId} className="flex justify-between text-sm">
                        <span className="text-gray-600">{question?.question}</span>
                        <span className="text-gray-900 font-medium">{answer}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Back Button */}
            {currentStep > 1 && (
              <div className="mt-6">
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  ← Go back
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}