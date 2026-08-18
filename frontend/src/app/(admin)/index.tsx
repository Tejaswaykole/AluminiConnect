import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Typography } from '../../components/Typography'; // For general fonts
import { ScreenContainer } from '../../components/ScreenContainer';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <ScreenContainer scrollable style={{ backgroundColor: '#f8f9ff' }} className="bg-admin-background flex-1">
      
      {/* Top Header */}
      <View className="mb-8 mt-2">
        <Typography variant="h1" className="text-admin-on-surface font-semibold text-3xl mb-1">Platform Overview</Typography>
        <Typography variant="body" className="text-admin-on-surface-variant text-lg">Real-time metrics and system health monitoring.</Typography>
      </View>

      {/* KPI Cards Row */}
      <View className="flex-row flex-wrap justify-between mb-8">
        
        {/* Total Users */}
        <View className="w-full md:w-[48%] lg:w-[23%] bg-admin-surface-card rounded-xl p-6 shadow-sm border border-admin-border-subtle mb-4 lg:mb-0">
          <View className="flex-row justify-between items-start mb-4">
            <View>
              <Typography variant="caption" className="text-admin-on-surface-variant font-medium text-sm">Total Users</Typography>
              <Typography variant="h2" className="text-admin-on-surface text-2xl mt-1">24,592</Typography>
            </View>
            <View className="p-2 bg-admin-primary-container rounded-full items-center justify-center">
              <MaterialIcons name="groups" size={24} color="#3525cd" />
            </View>
          </View>
          <View className="flex-row items-center mt-4 pt-4 border-t border-admin-border-subtle">
            <View className="flex-1">
              <Typography variant="caption" className="text-admin-on-surface-variant text-xs mb-1">Students</Typography>
              <Typography variant="body" className="text-admin-secondary font-semibold">14,205</Typography>
            </View>
            <View className="flex-1 border-l border-admin-border-subtle pl-4">
              <Typography variant="caption" className="text-admin-on-surface-variant text-xs mb-1">Alumni</Typography>
              <Typography variant="body" className="text-admin-tertiary font-semibold">10,387</Typography>
            </View>
          </View>
        </View>

        {/* Active Sessions */}
        <View className="w-full md:w-[48%] lg:w-[23%] bg-admin-surface-card rounded-xl p-6 shadow-sm border border-admin-border-subtle mb-4 lg:mb-0">
          <View className="flex-row justify-between items-start mb-4">
            <View>
              <Typography variant="caption" className="text-admin-on-surface-variant font-medium text-sm">Active Sessions</Typography>
              <Typography variant="h2" className="text-admin-on-surface text-2xl mt-1">1,204</Typography>
            </View>
            <View className="p-2 bg-admin-status-success-bg rounded-full items-center justify-center">
              <MaterialIcons name="monitor" size={24} color="#166534" />
            </View>
          </View>
          <View className="mt-4 pt-4 border-t border-admin-border-subtle flex-row items-center justify-between">
            <View className="flex-row items-center">
                <MaterialIcons name="trending-up" size={16} color="#166534" className="mr-1" />
                <Typography variant="caption" className="text-admin-status-success-text text-sm">+12% from last hour</Typography>
            </View>
          </View>
        </View>

        {/* Pending Reports */}
        <View className="w-full md:w-[48%] lg:w-[23%] bg-admin-surface-card rounded-xl p-6 shadow-sm border border-admin-border-subtle mb-4 lg:mb-0">
          <View className="flex-row justify-between items-start mb-4">
            <View>
              <Typography variant="caption" className="text-admin-on-surface-variant font-medium text-sm">Pending Reports</Typography>
              <Typography variant="h2" className="text-admin-on-surface text-2xl mt-1">42</Typography>
            </View>
            <View className="p-2 bg-admin-surface-container-high rounded-full items-center justify-center">
              <MaterialIcons name="flag" size={24} color="#191c20" />
            </View>
          </View>
          <View className="mt-4 pt-4 border-t border-admin-border-subtle flex-row items-center space-x-2">
            <View className="bg-admin-error-container px-2 py-0.5 rounded-full mr-2">
                <Typography variant="caption" className="text-admin-on-error-container text-[10px] font-medium">8 High Priority</Typography>
            </View>
            <View className="bg-admin-surface-variant px-2 py-0.5 rounded-full">
                <Typography variant="caption" className="text-admin-on-surface-variant text-[10px] font-medium">34 Standard</Typography>
            </View>
          </View>
        </View>

        {/* System Uptime */}
        <View className="w-full md:w-[48%] lg:w-[23%] bg-admin-surface-card rounded-xl p-6 shadow-sm border border-admin-border-subtle mb-4 lg:mb-0">
          <View className="flex-row justify-between items-start mb-4">
            <View>
              <Typography variant="caption" className="text-admin-on-surface-variant font-medium text-sm">System Uptime</Typography>
              <Typography variant="h2" className="text-admin-on-surface text-2xl mt-1">99.98%</Typography>
            </View>
            <View className="p-2 bg-admin-secondary-container rounded-full items-center justify-center">
              <MaterialIcons name="dns" size={24} color="#5b598c" />
            </View>
          </View>
          <View className="mt-4 pt-4 border-t border-admin-border-subtle">
            <View className="w-full bg-admin-surface-container-high rounded-full h-2 mb-2 overflow-hidden">
                <View className="bg-admin-primary h-2 rounded-full" style={{ width: '99.98%' }} />
            </View>
            <Typography variant="caption" className="text-admin-on-surface-variant text-right text-xs">Last 30 Days</Typography>
          </View>
        </View>

      </View>

      {/* Charts & Security */}
      <View className="flex-col lg:flex-row justify-between mb-8 space-y-8 lg:space-y-0 lg:space-x-8">
          
          {/* User Growth Chart */}
          <View className="w-full lg:w-2/3 bg-admin-surface-card rounded-xl shadow-sm border border-admin-border-subtle p-6 flex-col">
              <View className="flex-row justify-between items-center mb-6">
                  <Typography variant="h3" className="text-admin-on-surface text-xl">User Growth Overview</Typography>
                  <View className="bg-admin-surface-container-low rounded-lg px-3 py-1.5">
                      <Typography variant="caption" className="text-admin-on-surface">Last 6 Months</Typography>
                  </View>
              </View>
              <View className="flex-1 bg-admin-surface-container-lowest rounded-lg border border-admin-border-subtle min-h-[300px] items-center justify-center">
                  <View className="flex-row items-center">
                      <MaterialIcons name="show-chart" size={24} color="#464555" className="mr-2" />
                      <Typography variant="body" className="text-admin-on-surface-variant">Interactive Chart Visualization Area</Typography>
                  </View>
              </View>
          </View>

          {/* Security Monitoring */}
          <View className="w-full lg:w-1/3 bg-admin-surface-card rounded-xl shadow-sm border border-admin-border-subtle p-6 flex-col">
              <View className="flex-row justify-between items-center mb-6">
                  <Typography variant="h3" className="text-admin-on-surface text-xl">Security Monitoring</Typography>
                  <MaterialIcons name="security" size={24} color="#464555" />
              </View>
              
              <View className="bg-admin-error-container border border-[#fecaca] rounded-lg p-4 mb-4 flex-row items-start">
                  <MaterialIcons name="warning" size={20} color="#991b1b" className="mr-3 mt-0.5" />
                  <View>
                      <Typography variant="body" className="text-admin-status-error-text font-semibold text-sm">Failed Login Spike</Typography>
                      <Typography variant="caption" className="text-admin-on-error-container mt-1 mb-2">45 attempts from IP 192.168.1.x in last 10 mins.</Typography>
                      <TouchableOpacity>
                          <Typography variant="caption" className="text-admin-status-error-text font-semibold hover:underline">Review Logs</Typography>
                      </TouchableOpacity>
                  </View>
              </View>

              <View className="flex-1 pr-2">
                  <View className="flex-row items-center justify-between border-b border-admin-border-subtle pb-3 mb-3">
                      <View className="flex-row items-center">
                          <View className="w-8 h-8 rounded-full bg-admin-surface-container-high items-center justify-center mr-3">
                              <MaterialIcons name="person-add" size={18} color="#464555" />
                          </View>
                          <View>
                              <Typography variant="body" className="text-admin-on-surface text-sm">New Admin Role Assigned</Typography>
                              <Typography variant="caption" className="text-admin-on-surface-variant text-xs">To: sarah.j@institute.edu</Typography>
                          </View>
                      </View>
                      <Typography variant="caption" className="text-admin-on-surface-variant text-xs">2h ago</Typography>
                  </View>
                  <View className="flex-row items-center justify-between border-b border-admin-border-subtle pb-3 mb-3">
                      <View className="flex-row items-center">
                          <View className="w-8 h-8 rounded-full bg-admin-surface-container-high items-center justify-center mr-3">
                              <MaterialIcons name="api" size={18} color="#464555" />
                          </View>
                          <View>
                              <Typography variant="body" className="text-admin-on-surface text-sm">API Key Rotated</Typography>
                              <Typography variant="caption" className="text-admin-on-surface-variant text-xs">Service: Payment Gateway</Typography>
                          </View>
                      </View>
                      <Typography variant="caption" className="text-admin-on-surface-variant text-xs">5h ago</Typography>
                  </View>
                  <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                          <View className="w-8 h-8 rounded-full bg-admin-surface-container-high items-center justify-center mr-3">
                              <MaterialIcons name="update" size={18} color="#464555" />
                          </View>
                          <View>
                              <Typography variant="body" className="text-admin-on-surface text-sm">System Backup Completed</Typography>
                              <Typography variant="caption" className="text-admin-on-surface-variant text-xs">Size: 4.2TB</Typography>
                          </View>
                      </View>
                      <Typography variant="caption" className="text-admin-on-surface-variant text-xs">1d ago</Typography>
                  </View>
              </View>
          </View>
      </View>

      {/* Audit Log Table */}
      <View className="bg-admin-surface-card rounded-xl shadow-sm border border-admin-border-subtle overflow-hidden">
          <View className="p-6 border-b border-admin-border-subtle flex-row justify-between items-center bg-admin-surface-bright">
              <Typography variant="h3" className="text-admin-on-surface text-xl">Recent Audit Log</Typography>
              <TouchableOpacity>
                  <Typography variant="body" className="text-admin-primary font-semibold text-sm">View All</Typography>
              </TouchableOpacity>
          </View>
          <View className="w-full">
              {/* Table Header mock */}
              <View className="flex-row bg-admin-surface-container-lowest border-b border-admin-border-subtle py-3 px-6 hidden md:flex">
                  <Typography variant="caption" className="flex-1 text-admin-on-surface-variant font-semibold">Actor</Typography>
                  <Typography variant="caption" className="flex-1 text-admin-on-surface-variant font-semibold">Action</Typography>
                  <Typography variant="caption" className="flex-1 text-admin-on-surface-variant font-semibold">Target</Typography>
                  <Typography variant="caption" className="flex-1 text-admin-on-surface-variant font-semibold text-right">Status</Typography>
              </View>
              {/* Row 1 */}
              <View className="flex-col md:flex-row border-b border-admin-border-subtle hover:bg-admin-surface-container-lowest py-3 px-6">
                  <View className="flex-1 flex-row items-center mb-2 md:mb-0">
                      <View className="w-6 h-6 rounded-full bg-admin-primary-container items-center justify-center mr-2">
                          <Typography variant="caption" className="text-admin-primary font-bold text-xs">JD</Typography>
                      </View>
                      <Typography variant="body" className="text-admin-on-surface">admin_jdow</Typography>
                  </View>
                  <View className="flex-1 justify-center mb-2 md:mb-0">
                      <Typography variant="body" className="text-admin-on-surface">UPDATE_POLICY</Typography>
                  </View>
                  <View className="flex-1 justify-center mb-2 md:mb-0">
                      <Typography variant="caption" className="text-admin-on-surface-variant">privacy_v2.1</Typography>
                  </View>
                  <View className="flex-1 items-start md:items-end justify-center">
                      <View className="bg-admin-status-success-bg border border-[#bbf7d0] px-2.5 py-0.5 rounded-full">
                          <Typography variant="caption" className="text-admin-status-success-text font-medium text-xs">Success</Typography>
                      </View>
                  </View>
              </View>
              {/* Row 2 */}
              <View className="flex-col md:flex-row border-b border-admin-border-subtle hover:bg-admin-surface-container-lowest py-3 px-6">
                  <View className="flex-1 flex-row items-center mb-2 md:mb-0">
                      <MaterialIcons name="smart-toy" size={20} color="#464555" className="mr-2" />
                      <Typography variant="body" className="text-admin-on-surface">system_bot</Typography>
                  </View>
                  <View className="flex-1 justify-center mb-2 md:mb-0">
                      <Typography variant="body" className="text-admin-on-surface">DATA_SYNC</Typography>
                  </View>
                  <View className="flex-1 justify-center mb-2 md:mb-0">
                      <Typography variant="caption" className="text-admin-on-surface-variant">crm_integration</Typography>
                  </View>
                  <View className="flex-1 items-start md:items-end justify-center">
                      <View className="bg-admin-status-success-bg border border-[#bbf7d0] px-2.5 py-0.5 rounded-full">
                          <Typography variant="caption" className="text-admin-status-success-text font-medium text-xs">Success</Typography>
                      </View>
                  </View>
              </View>
          </View>
      </View>

    </ScreenContainer>
  );
}
