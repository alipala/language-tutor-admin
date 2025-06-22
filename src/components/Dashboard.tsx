import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, CircularProgress } from '@mui/material';
import { People, School, Assessment, TrendingUp } from '@mui/icons-material';
import { DashboardMetrics } from '../types';
import { httpClient } from '../services/httpClient';
import { API_CONFIG } from '../config/constants';

// Metric card component
interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom variant="overline">
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </Box>
        <Box sx={{ color, display: 'flex', alignItems: 'center' }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

// Main dashboard component
export const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await httpClient.get<DashboardMetrics>(API_CONFIG.ENDPOINTS.ADMIN_DASHBOARD);
        setMetrics(data);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Please check your connection and try again.
        </Typography>
      </Box>
    );
  }

  if (!metrics) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">No data available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Welcome to the Language Tutor Admin Panel
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3, mb: 4 }}>
        <MetricCard
          title="Total Users"
          value={metrics.total_users.toLocaleString()}
          icon={<People fontSize="large" />}
          color="#1976d2"
        />
        
        <MetricCard
          title="Active Users"
          value={metrics.active_users.toLocaleString()}
          icon={<TrendingUp fontSize="large" />}
          color="#2e7d32"
        />
        
        <MetricCard
          title="Conversations"
          value={metrics.total_conversations.toLocaleString()}
          icon={<School fontSize="large" />}
          color="#ed6c02"
        />
        
        <MetricCard
          title="Assessments"
          value={metrics.total_assessments.toLocaleString()}
          icon={<Assessment fontSize="large" />}
          color="#9c27b0"
        />
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            System Overview
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Verified Users
              </Typography>
              <Typography variant="h6">
                {metrics.verified_users.toLocaleString()}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Learning Plans
              </Typography>
              <Typography variant="h6">
                {metrics.total_learning_plans.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
