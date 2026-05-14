import { useState, useEffect, useRef } from 'react';
import { adminApi, AdminMessage } from '../../api/admin';

type FilterKey = 'all' | 'unread' | 'admin';

interface Thread {
  partnerEmail: string;
  messages: AdminMessage[];
  hasUnread: boolean;
}

function groupIntoThreads(messages: AdminMessage[], adminEmail: string): Thread[] {
  const map = new Map<string, AdminMessage[]>();
  for (const m of messages) {
    const partner = m.sender_email === adminEmail
      ? (m.receiver_email ?? 'broadcast')
      : m.sender_email;
    if (!map.has(partner)) map.set(partner, []);
    map.get(partner)!.push(m);
  }
  return Array.from(map.entries()).map(([partnerEmail, msgs]) => ({
    partnerEmail,
    messages: msgs.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
    hasUnread: msgs.some(m => !m.is_read && m.sender_email !== adminEmail),
  }));
}

export default function AdminMessages() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // In a real session the admin's email would come from auth context.
  // We use a placeholder here; replace with user.email from useOutletContext if needed.
  const adminEmail = 'admin@platform.com';

  function loadMessages() {
    adminApi.getMessages()
      .then(msgs => setThreads(groupIntoThreads(msgs, adminEmail)))
      .catch(() => setError('Failed to load messages'))
      .finally(() => setLoading(false));
  }

  useEffect(loadMessages, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [activeIndex, threads]);

  const filteredThreads = threads.filter(t => {
    if (filter === 'unread') return t.hasUnread;
    if (filter === 'admin') return t.partnerEmail === 'broadcast';
    return true;
  });

  const activeThread = filteredThreads[activeIndex] ?? null;

  async function handleSend() {
    if (!newMessage.trim() || !activeThread) return;
    setSending(true);
    try {
      // Find receiver's user_id from thread messages
      const receiverMsg = activeThread.messages.find(m => m.sender_email === activeThread.partnerEmail);
      if (receiverMsg) {
        await adminApi.sendMessage({
          receiver_id: receiverMsg.sender_id,
          subject: `Re: ${activeThread.messages[0]?.subject ?? 'Message'}`,
          content: newMessage.trim(),
        });
        setNewMessage('');
        loadMessages();
      }
    } catch {
      setError('Failed to send message');
    } finally {
      setSending(false);
    }
  }

  async function markRead(messageId: number) {
    try { await adminApi.markMessageRead(messageId); }
    catch { /* non-critical */ }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Messages & Support</h1>
        <p className="text-sm text-gray-500 mt-1">Manage user communications and support requests</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 flex justify-between">
          {error}
          <button onClick={() => setError(null)} className="font-bold">×</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[680px]">
        {/* Thread list */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900">Conversations</h2>
              <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full font-medium">
                {threads.filter(t => t.hasUnread).length} unread
              </span>
            </div>
            <div className="flex gap-1">
              {(['all', 'unread', 'admin'] as FilterKey[]).map(f => (
                <button key={f} onClick={() => { setFilter(f); setActiveIndex(0); }}
                  className={`flex-1 py-1 text-xs rounded-md font-medium capitalize transition-colors ${
                    filter === f ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {loading ? (
              <div className="flex items-center justify-center h-24 text-gray-400 text-sm">Loading…</div>
            ) : filteredThreads.length === 0 ? (
              <div className="flex items-center justify-center h-24 text-gray-400 text-sm">No conversations</div>
            ) : filteredThreads.map((t, i) => (
              <button key={t.partnerEmail} onClick={() => setActiveIndex(i)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${activeIndex === i ? 'bg-blue-50' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-sm shrink-0">
                    {t.partnerEmail === 'broadcast' ? '📢' : '💬'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">{t.partnerEmail}</p>
                      {t.hasUnread && <div className="w-2 h-2 bg-indigo-500 rounded-full shrink-0 ml-1" />}
                    </div>
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {t.messages[t.messages.length - 1]?.content ?? ''}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
          {activeThread ? (
            <>
              {/* Chat header */}
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-lg">💬</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{activeThread.partnerEmail}</p>
                    <p className="text-xs text-gray-400">{activeThread.messages.length} messages</p>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 font-medium">
                  ✅ Mark Resolved
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 bg-gray-50 space-y-3">
                {activeThread.messages.map(m => {
                  const isAdmin = m.sender_email === adminEmail;
                  if (!m.is_read && !isAdmin) markRead(m.message_id);
                  return (
                    <div key={m.message_id} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${
                        isAdmin ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900'
                      }`}>
                        {m.subject && (
                          <p className={`text-xs font-semibold mb-1 ${isAdmin ? 'text-indigo-200' : 'text-gray-500'}`}>
                            {m.subject}
                          </p>
                        )}
                        <p className="text-sm leading-relaxed">{m.content}</p>
                        <p className={`text-xs mt-2 ${isAdmin ? 'text-indigo-300' : 'text-gray-400'}`}>
                          {m.sender_email} · {new Date(m.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="px-5 py-4 border-t border-gray-100">
                <div className="flex gap-3 items-end">
                  <textarea
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                    placeholder="Type your message…"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!newMessage.trim() || sending}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <span>📤</span> Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <div className="text-5xl mb-3">💬</div>
              <p className="text-base font-medium">No conversations found</p>
              <p className="text-sm mt-1">Select a conversation or change the filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
