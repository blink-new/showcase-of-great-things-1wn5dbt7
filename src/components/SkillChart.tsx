import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface SkillData {
  name: string;
  percentage: number;
  color: string;
}

interface SkillChartProps {
  skills: SkillData[];
  title: string;
}

const SkillChart: React.FC<SkillChartProps> = ({ skills, title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
    >
      <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        {title}
      </h4>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={skills}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.3)" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: 'currentColor' }}
              stroke="currentColor"
            />
            <YAxis 
              tick={{ fontSize: 12, fill: 'currentColor' }}
              stroke="currentColor"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(156, 163, 175, 0.3)',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)',
              }}
              formatter={(value: number) => [`${value}%`, 'Proficiency']}
            />
            <Bar 
              dataKey="percentage" 
              fill="url(#skillGradient)"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="skillGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Alternative horizontal bars for mobile */}
      <div className="md:hidden mt-4 space-y-3">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="space-y-1"
          >
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
              <span className="text-gray-600 dark:text-gray-400">{skill.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.percentage}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                style={{ backgroundColor: skill.color }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillChart;