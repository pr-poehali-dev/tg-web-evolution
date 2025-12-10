import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

type Section = 'chats' | 'contacts' | 'channels' | 'profile' | 'media' | 'settings';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  pinned?: boolean;
}

interface Message {
  id: number;
  text: string;
  time: string;
  sent: boolean;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('chats');
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [messageText, setMessageText] = useState('');

  const mockChats: Chat[] = [
    { id: 1, name: 'Мария Иванова', avatar: '👩‍💼', lastMessage: 'Отлично! Созвонимся завтра', time: '14:32', unread: 0, online: true, pinned: true },
    { id: 2, name: 'Команда Разработки', avatar: '💻', lastMessage: 'Антон: Деплой готов', time: '13:15', unread: 5, online: false, pinned: true },
    { id: 3, name: 'Александр Петров', avatar: '👨‍💻', lastMessage: 'Спасибо за презентацию!', time: '11:48', unread: 0, online: true },
    { id: 4, name: 'Проект "Альфа"', avatar: '🚀', lastMessage: 'Елена: Нужно обсудить бюджет', time: '10:22', unread: 12, online: false },
    { id: 5, name: 'Анна Смирнова', avatar: '👩‍🎨', lastMessage: 'Дизайн макеты готовы', time: 'Вчера', unread: 0, online: false },
    { id: 6, name: 'Техподдержка', avatar: '🛠️', lastMessage: 'Ваш запрос обработан', time: 'Вчера', unread: 0, online: true },
  ];

  const mockMessages: Message[] = [
    { id: 1, text: 'Привет! Как проект?', time: '14:28', sent: false },
    { id: 2, text: 'Отлично двигаемся! Уже 80% готово', time: '14:30', sent: true },
    { id: 3, text: 'Круто! Можем созвониться завтра?', time: '14:31', sent: false },
    { id: 4, text: 'Отлично! Созвонимся завтра', time: '14:32', sent: true },
  ];

  const mockContacts = [
    { id: 1, name: 'Мария Иванова', avatar: '👩‍💼', role: 'Менеджер проекта', online: true },
    { id: 2, name: 'Александр Петров', avatar: '👨‍💻', role: 'Разработчик', online: true },
    { id: 3, name: 'Анна Смирнова', avatar: '👩‍🎨', role: 'Дизайнер', online: false },
    { id: 4, name: 'Дмитрий Козлов', avatar: '👨‍💼', role: 'Аналитик', online: false },
  ];

  const mockChannels = [
    { id: 1, name: 'Новости Компании', avatar: '📢', subscribers: '2.4K', description: 'Официальный канал новостей' },
    { id: 2, name: 'Технологии', avatar: '💡', subscribers: '15.8K', description: 'Всё о новых технологиях' },
    { id: 3, name: 'Дизайн Тренды', avatar: '🎨', subscribers: '8.2K', description: 'Последние тренды в дизайне' },
  ];

  const navItems = [
    { id: 'chats' as Section, icon: 'MessageCircle', label: 'Чаты', badge: 17 },
    { id: 'contacts' as Section, icon: 'Users', label: 'Контакты' },
    { id: 'channels' as Section, icon: 'Radio', label: 'Каналы' },
    { id: 'profile' as Section, icon: 'User', label: 'Профиль' },
    { id: 'media' as Section, icon: 'Image', label: 'Медиа' },
    { id: 'settings' as Section, icon: 'Settings', label: 'Настройки' },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText('');
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'chats':
        return (
          <div className="flex-1 flex overflow-hidden">
            <div className="w-80 border-r border-border/50 flex flex-col glass">
              <div className="p-4 space-y-4">
                <div className="relative">
                  <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input placeholder="Поиск чатов..." className="pl-10 glass-card border-white/10" />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" className="flex-1 glass-card border-white/10">
                    <Icon name="Users" size={16} className="mr-1" />
                    Все
                  </Button>
                  <Button size="sm" variant="ghost" className="flex-1 glass-hover">
                    <Icon name="Briefcase" size={16} className="mr-1" />
                    Работа
                  </Button>
                </div>
              </div>
              <Separator />
              <ScrollArea className="flex-1">
                <div className="space-y-1 p-2">
                  {mockChats.map(chat => (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                      className={`p-3 rounded-lg cursor-pointer glass-hover ${
                        selectedChat === chat.id ? 'glass-card glow' : ''
                      } ${chat.pinned ? 'border-l-2 border-primary' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
                            {chat.avatar}
                          </div>
                          {chat.online && (
                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-card"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                            <span className="text-xs text-muted-foreground">{chat.time}</span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                            {chat.unread > 0 && (
                              <Badge className="bg-primary text-primary-foreground min-w-[20px] h-5 flex items-center justify-center px-1.5">
                                {chat.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="flex-1 flex flex-col">
              {selectedChat ? (
                <>
                  <div className="h-16 border-b border-white/10 px-6 flex items-center justify-between glass">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl">
                        {mockChats.find(c => c.id === selectedChat)?.avatar}
                      </div>
                      <div>
                        <h2 className="font-semibold">{mockChats.find(c => c.id === selectedChat)?.name}</h2>
                        <p className="text-xs text-muted-foreground">в сети</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost">
                        <Icon name="Phone" size={20} />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Icon name="Video" size={20} />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Icon name="MoreVertical" size={20} />
                      </Button>
                    </div>
                  </div>

                  <ScrollArea className="flex-1 p-6">
                    <div className="space-y-4 max-w-4xl mx-auto">
                      {mockMessages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                          <div className={`max-w-md ${msg.sent ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground glow' : 'glass-card'} px-4 py-2.5 rounded-2xl ${msg.sent ? 'rounded-br-sm' : 'rounded-bl-sm'}`}>
                            <p className="text-sm">{msg.text}</p>
                            <span className={`text-xs mt-1 block ${msg.sent ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                              {msg.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="border-t border-white/10 p-4 glass">
                    <div className="flex gap-2 items-center max-w-4xl mx-auto">
                      <Button size="icon" variant="ghost">
                        <Icon name="Paperclip" size={20} />
                      </Button>
                      <Input
                        placeholder="Написать сообщение..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 glass-card border-white/10"
                      />
                      <Button size="icon" variant="ghost">
                        <Icon name="Smile" size={20} />
                      </Button>
                      <Button size="icon" className="bg-gradient-to-r from-primary to-secondary glow" onClick={handleSendMessage}>
                        <Icon name="Send" size={20} />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-5xl glow animate-pulse-glow">
                      💬
                    </div>
                    <h3 className="text-xl font-heading font-bold">Выберите чат</h3>
                    <p className="text-muted-foreground">Начните общение с коллегами</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'contacts':
        return (
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-heading font-bold">Контакты</h1>
                <Button className="bg-gradient-to-r from-primary to-secondary glow">
                  <Icon name="UserPlus" size={18} className="mr-2" />
                  Добавить
                </Button>
              </div>
              <Input placeholder="Поиск контактов..." className="glass-card border-white/10" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockContacts.map(contact => (
                  <div key={contact.id} className="glass-card p-6 rounded-xl glass-hover cursor-pointer group">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl">
                          {contact.avatar}
                        </div>
                        {contact.online && (
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.role}</p>
                        <Button size="sm" variant="ghost" className="mt-3 group-hover:bg-accent">
                          <Icon name="MessageCircle" size={16} className="mr-2" />
                          Написать
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'channels':
        return (
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-heading font-bold">Каналы</h1>
                <Button className="bg-gradient-to-r from-primary to-secondary glow">
                  <Icon name="Plus" size={18} className="mr-2" />
                  Создать канал
                </Button>
              </div>
              <Input placeholder="Поиск каналов..." className="glass-card border-white/10" />
              <div className="space-y-4">
                {mockChannels.map(channel => (
                  <div key={channel.id} className="glass-card p-6 rounded-xl glass-hover cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl">
                        {channel.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{channel.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{channel.description}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Icon name="Users" size={14} />
                            {channel.subscribers}
                          </span>
                          <Button size="sm" variant="ghost" className="group-hover:bg-accent">
                            Подписаться
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="glass p-8 rounded-xl text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-6xl mb-4 glow animate-pulse-glow">
                  👤
                </div>
                <h1 className="text-2xl font-heading font-bold mb-2">Ваше Имя</h1>
                <p className="text-muted-foreground mb-4">@username</p>
                <Badge variant="secondary" className="mb-6">Бизнес аккаунт</Badge>
                <div className="flex gap-3 justify-center">
                  <Button className="bg-gradient-to-r from-primary to-secondary glow">
                    <Icon name="Edit" size={18} className="mr-2" />
                    Редактировать
                  </Button>
                  <Button variant="outline">
                    <Icon name="Settings" size={18} className="mr-2" />
                    Настройки
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="glass-card p-6 rounded-xl text-center glass-hover">
                  <div className="text-3xl font-bold text-primary text-glow mb-1">142</div>
                  <div className="text-sm text-muted-foreground">Контактов</div>
                </div>
                <div className="glass-card p-6 rounded-xl text-center glass-hover">
                  <div className="text-3xl font-bold text-secondary text-glow mb-1">8</div>
                  <div className="text-sm text-muted-foreground">Каналов</div>
                </div>
                <div className="glass-card p-6 rounded-xl text-center glass-hover">
                  <div className="text-3xl font-bold text-accent text-glow mb-1">3.2K</div>
                  <div className="text-sm text-muted-foreground">Сообщений</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'media':
        return (
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-6xl mx-auto space-y-6">
              <h1 className="text-3xl font-heading font-bold">Медиа</h1>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="glass-card border-white/10">Все файлы</Button>
                <Button variant="ghost" size="sm" className="glass-hover">Фото</Button>
                <Button variant="ghost" size="sm" className="glass-hover">Видео</Button>
                <Button variant="ghost" size="sm" className="glass-hover">Документы</Button>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                  <div key={i} className="aspect-square glass-card rounded-lg cursor-pointer glass-hover flex items-center justify-center text-4xl">
                    {['📸', '🎥', '📄', '🖼️', '🎵'][i % 5]}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-2xl mx-auto space-y-6">
              <h1 className="text-3xl font-heading font-bold mb-6">Настройки</h1>
              <div className="space-y-2">
                {[
                  { icon: 'Bell', title: 'Уведомления', desc: 'Настройка звуков и оповещений' },
                  { icon: 'Lock', title: 'Приватность', desc: 'Управление конфиденциальностью' },
                  { icon: 'Palette', title: 'Внешний вид', desc: 'Темы и оформление' },
                  { icon: 'Globe', title: 'Язык', desc: 'Язык интерфейса' },
                  { icon: 'Database', title: 'Хранилище', desc: 'Управление данными' },
                  { icon: 'Shield', title: 'Безопасность', desc: 'Двухфакторная аутентификация' },
                ].map((item, i) => (
                  <div key={i} className="glass-card p-4 rounded-xl glass-hover cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-muted group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary transition-all flex items-center justify-center">
                        <Icon name={item.icon as any} size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <div className="h-14 border-b border-white/10 px-4 flex items-center justify-between glass">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-sm glow">
            TG
          </div>
          <h1 className="text-xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-glow">
            Telegram Evolution
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Icon name="Search" size={20} />
          </Button>
          <Button size="icon" variant="ghost">
            <Icon name="Bell" size={20} />
          </Button>
          <Avatar className="w-8 h-8 cursor-pointer">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-xs font-semibold">ВЫ</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-20 border-r border-white/10 flex flex-col items-center py-4 gap-2 glass">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                activeSection === item.id
                  ? 'bg-gradient-to-br from-primary to-secondary text-primary-foreground glow'
                  : 'text-muted-foreground glass-hover'
              }`}
              title={item.label}
            >
              <Icon name={item.icon as any} size={24} />
              {item.badge && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-secondary glow border-2 border-white/20">
                  {item.badge}
                </Badge>
              )}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Index;