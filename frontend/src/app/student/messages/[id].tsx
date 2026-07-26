import { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../../components/Typography';
import { Avatar } from '../../../components/Avatar';
import { MaterialIcons } from '@expo/vector-icons';
import { useStudents } from '../../../hooks/queries/useStudents';
import { useAlumni } from '../../../hooks/queries/useAlumni';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const { data: studentList = [] } = useStudents();
  const { data: alumniList = [] } = useAlumni();
  
  const mockInboxUsers: Record<string, string> = {
    '1': 'Ramesh Patil',
    '2': 'Aditi Joshi',
    '3': 'Alumni Network Admin',
  };

  const chatPartner = studentList.find(s => s.id === id) || alumniList.find(a => a.id === id);
  const partnerName = chatPartner ? (chatPartner.name || chatPartner.first_name || 'User') : (mockInboxUsers[id as string] || 'User');
  const partnerAvatar = chatPartner?.avatar || '';

  const [messages, setMessages] = useState([
    { id: '1', text: `Hi! Thanks for connecting.`, sender: 'them', time: '10:00 AM' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInputText('');
    
    // Simulate realistic auto-reply
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "That sounds great! Let's schedule a time to discuss this further.",
        sender: 'them',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-border bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 p-2">
          <MaterialIcons name="arrow-back" size={24} color="#154539" />
        </TouchableOpacity>
        <Avatar url={partnerAvatar} fallbackInitials={partnerName.charAt(0)} size="sm" className="mr-3" />
        <View className="flex-1">
          <Typography variant="h3">{partnerName}</Typography>
          <Typography variant="caption" color="primary">Online</Typography>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        className="flex-1 px-4"
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
        renderItem={({ item }) => (
          <View className={`mb-4 max-w-[80%] rounded-2xl p-3 ${item.sender === 'me' ? 'self-end bg-primary rounded-tr-sm' : 'self-start bg-primary/10 rounded-tl-sm'}`}>
            <Typography variant="body" color={item.sender === 'me' ? 'inverse' : 'default'} className="mb-1">
              {item.text}
            </Typography>
            <Typography variant="caption" color={item.sender === 'me' ? 'inverse' : 'muted'} className="opacity-70 text-right text-[10px]">
              {item.time}
            </Typography>
          </View>
        )}
        ListFooterComponent={isTyping ? (
          <View className="self-start bg-primary/10 rounded-2xl p-3 rounded-tl-sm mb-4 flex-row items-center">
            <ActivityIndicator size="small" color="#154539" />
            <Typography variant="caption" className="ml-2">typing...</Typography>
          </View>
        ) : null}
      />

      {/* Input Area */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View className="flex-row items-center p-4 border-t border-border bg-surface">
          <TextInput
            className="flex-1 bg-background rounded-full px-4 py-2 mr-3 border border-border"
            placeholder="Type a message..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity 
            className={`w-10 h-10 rounded-full items-center justify-center ${inputText.trim() ? 'bg-primary' : 'bg-border'}`}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <MaterialIcons name="send" size={20} color={inputText.trim() ? '#ffffff' : '#94a3b8'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
