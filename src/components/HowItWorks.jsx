'use client';

export default function HowItWorks() {
  const contacts = [
    {
      method: 'Email',
      value: 'owner@sqcondounits.com',
      description: 'For formal inquiries and detailed booking requests.',
      icon: (
        <svg className="w-6 h-6 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      method: 'Phone',
      value: '+63 917 123 4567',
      description: 'For immediate assistance and urgent concerns.',
      icon: (
        <svg className="w-6 h-6 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.864-1.051l-3.21-.535a1.125 1.125 0 00-1.227.598l-.959 1.919A15.86 15.86 0 015.659 7.41l1.92-.959c.29-.145.47-.442.598-1.227l.535-3.21C8.716 2.601 8.266 2.25 7.75 2.25H6.375A2.25 2.25 0 004.125 4.5v2.25z" />
        </svg>
      ),
    },
    {
      method: 'Messenger',
      value: 'm.me/sqcondounits',
      description: 'Quick chats and real-time availability checks.',
      icon: (
        <svg className="w-6 h-6 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
      ),
    },
    {
      method: 'Instagram',
      value: '@sqcondounits',
      description: 'Follow for the latest photos, updates, and promos.',
      icon: (
        <svg className="w-6 h-6 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact-owner" className="bg-white dark:bg-[#080808] border-t border-neutral-200 dark:border-neutral-900" aria-label="Contact the Owner">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 py-20 md:py-28">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center text-center mb-16 w-full">
          <p className="text-[10px] font-bold lowercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500 mb-3 border-b border-neutral-200 dark:border-neutral-800 pb-1.5 inline-block text-center">
            03 • direct contact
          </p>
          <h2
            className="text-3xl md:text-5xl font-black text-neutral-950 dark:text-white mb-4 mt-2 uppercase tracking-tight text-center w-full"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Get In Touch
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-md mx-auto text-center">
            Reach out directly to Sheena Q. for inquiries, negotiations, or immediate booking assistance.
          </p>
        </div>

        {/* Contacts Grid - Floating card layout with hover lift */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 md:gap-8 w-full max-w-6xl mx-auto justify-center justify-items-center">
          {contacts.map((contact) => {
            const hrefMap = {
              Email: 'mailto:owner@sqcondounits.com',
              Phone: 'tel:+639171234567',
              Messenger: 'https://m.me/sqcondounits',
              Instagram: 'https://instagram.com/sqcondounits',
            };
            return (
              <a
                key={contact.method}
                href={hrefMap[contact.method]}
                target={contact.method !== 'Phone' && contact.method !== 'Email' ? '_blank' : undefined}
                rel={contact.method !== 'Phone' && contact.method !== 'Email' ? 'noopener noreferrer' : undefined}
                className="flex flex-col items-center text-center p-8 md:p-10 bg-neutral-50/20 hover:bg-neutral-50 dark:bg-transparent dark:hover:bg-neutral-900/40 rounded-2xl transition-all duration-300 group cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-200/20 dark:hover:shadow-none"
              >
                {/* Icon Container with Round Background */}
                <div className="mb-6 flex items-center justify-center w-14 h-14 bg-neutral-100/80 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black rounded-full transition-all duration-300">
                  {contact.icon}
                </div>

                <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-600 tracking-[0.25em] mb-2 uppercase font-mono">
                  {contact.method}
                </span>
                <h3 className="text-[12px] md:text-[13px] font-bold tracking-wider text-neutral-950 dark:text-white mb-2 transition-colors duration-300 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 font-mono break-all px-2">
                  {contact.value}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed max-w-[200px] mt-1.5">
                  {contact.description}
                </p>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
