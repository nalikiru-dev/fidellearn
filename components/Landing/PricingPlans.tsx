'use client';



import React from 'react';

import { motion } from 'framer-motion';

import { Card } from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import { Check, Star } from 'lucide-react';



interface PlanFeature {

  text: string;

  included: boolean;

}



interface Plan {

  name: string;

  price: number;

  description: string;

  features: PlanFeature[];

  popular?: boolean;

  color: string;

  buttonVariant: 'default' | 'outline' | 'secondary';

}



const plans: Plan[] = [

  {

    name: 'Basic',

    price: 0,

    description: 'Perfect for getting started',

    color: 'from-blue-500 to-blue-600',

    buttonVariant: 'outline',

    features: [

      { text: 'Access to free courses', included: true },

      { text: 'Basic progress tracking', included: true },

      { text: 'Community forum access', included: true },

      { text: 'Mobile app access', included: true },

      { text: 'Offline downloads', included: false },

      { text: 'Certificate of completion', included: false },

      { text: 'Priority support', included: false },

      { text: 'Ad-free experience', included: false },

    ],

  },

  {

    name: 'Pro',

    price: 29.99,

    description: 'Best for serious students',

    color: 'from-purple-500 to-purple-600',

    buttonVariant: 'default',

    popular: true,

    features: [

      { text: 'All Basic features', included: true },

      { text: 'Unlimited course access', included: true },

      { text: 'Offline downloads', included: true },

      { text: 'Certificate of completion', included: true },

      { text: 'Priority support', included: true },

      { text: 'Ad-free experience', included: true },

      { text: 'Group study rooms', included: true },

      { text: 'AI tutor assistance', included: false },

    ],

  },

  {

    name: 'Enterprise',

    price: 99.99,

    description: 'For schools and institutions',

    color: 'from-indigo-500 to-indigo-600',

    buttonVariant: 'secondary',

    features: [

      { text: 'All Pro features', included: true },

      { text: 'Custom learning paths', included: true },

      { text: 'Advanced analytics', included: true },

      { text: 'API access', included: true },

      { text: 'Dedicated account manager', included: true },

      { text: 'Custom branding', included: true },

      { text: 'Bulk licensing', included: true },

      { text: '24/7 phone support', included: true },

    ],

  },

];



export const PricingPlans = () => {

  return (

    <section className="py-20 bg-gray-50">

      <div className="container mx-auto px-4">

        <div className="text-center mb-16">

          <h2 className="text-3xl md:text-4xl font-bold mb-4">

            Choose Your Learning Journey

          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">

            Select the plan that best fits your educational needs. All plans include access to our growing library of Ethiopian curriculum-aligned content.

          </p>

        </div>



        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">

          {plans.map((plan, index) => (

            <motion.div

              key={plan.name}

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: index * 0.2 }}

              className="relative"

            >

              <Card className={`h-full ${

                plan.popular ? 'border-2 border-purple-500 shadow-xl' : 'border border-gray-200'

              }`}>

                {plan.popular && (

                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">

                    <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">

                      <Star className="h-4 w-4" />

                      Most Popular

                    </span>

                  </div>

                )}



                <div className="p-6">

                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

                  <p className="text-gray-600 mb-4">{plan.description}</p>

                  <div className="mb-6">

                    <span className="text-4xl font-bold">${plan.price}</span>

                    <span className="text-gray-600">/month</span>

                  </div>



                  <Button 

                    className={`w-full mb-6 ${

                      plan.popular ? 'bg-gradient-to-r ' + plan.color + ' text-white' : ''

                    }`}

                    variant={plan.buttonVariant}

                  >

                    Get Started

                  </Button>



                  <div className="space-y-4">

                    {plan.features.map((feature, featureIndex) => (

                      <div 

                        key={featureIndex}

                        className="flex items-center gap-3"

                      >

                        <Check 

                          className={`h-5 w-5 ${

                            feature.included ? 'text-green-500' : 'text-gray-300'

                          }`} 

                        />

                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>

                          {feature.text}

                        </span>

                      </div>

                    ))}

                  </div>

                </div>

              </Card>

            </motion.div>

          ))}

        </div>



        <div className="mt-12 text-center">

          <p className="text-gray-600 mb-4">Need a custom plan for your organization?</p>

          <Button variant="outline" size="lg">

            Contact Sales

          </Button>

        </div>

      </div>

    </section>

  );

};














