/* ============================================================
   NOVA — script.js
   Language switch, mobile nav, feature modals, command search,
   help menu preview, !help <feature> preview.
   ============================================================ */
'use strict';

const CONFIG = {
  BOT_NAME: "Nova",
  BOT_OWNER: "nova_.inovation",
  BOT_AVATAR: "assets/avatar.png",
  BOT_INVITE_URL: "https://discord.com/oauth2/authorize?client_id=1532745879944036523",
  CONTACT_EMAIL: "anhbao27072011@gmail.com",
  SUPPORT_SERVER_URL: "https://discord.gg/qkyu3G6WMa",
  AI_PROVIDER: "Qwen3.7-max",
  EFFECTIVE_DATE: "19/09/2026"
};

/* ---------- FALLBACK AVATAR (SVG data URI) ---------- */
const FALLBACK_AVATAR =
  "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#7c5cff"/>
          <stop offset=".55" stop-color="#5f3fff"/>
          <stop offset="1" stop-color="#3fa9ff"/>
        </linearGradient>
      </defs>
      <rect width="128" height="128" rx="34" fill="url(#g)"/>
      <path d="M40 88V40l24 28 24-28v48" fill="none" stroke="#fff" stroke-width="9"
            stroke-linecap="round" stroke-linejoin="round" opacity=".95"/>
    </svg>`
  );

/* ============================================================
   I18N DICTIONARY
   ============================================================ */
const I18N = {
  vi: {
    "meta.title": "Nova — AI Discord Bot",
    "a11y.skip": "Chuyển tới nội dung",
    "nav.home": "Trang chủ",
    "nav.features": "Tính năng",
    "nav.commands": "Lệnh",
    "nav.help": "Trợ giúp",
    "nav.privacy": "Bảo mật",
    "nav.terms": "Điều khoản",
    "nav.invite": "Mời Nova",
    "hero.badge": "AI Discord Bot · Qwen3.7-max",
    "hero.sub": "Trợ lý Discord thông minh của bạn cho AI chat, tạo ảnh AI, điều phối War/Backup, sự kiện, bảo vệ Ban Zone, kiểm duyệt và quản lý server.",
    "hero.invite": "Mời Nova",
    "hero.support": "Tham gia Support Server",
    "hero.explore": "Khám phá tính năng",
    "hero.stat1l": "Mô hình AI công khai",
    "hero.stat2l": "Chủ sở hữu bot",
    "hero.stat3l": "Nhóm tính năng",
    "hero.stat4l": "Lệnh slash & prefix",
    "features.kicker": "Tính năng",
    "features.title": "Mọi thứ Nova có thể làm",
    "features.sub": "Nhấn vào một nhóm tính năng để xem mô tả đầy đủ, danh sách lệnh, quyền cần thiết và ví dụ.",
    "features.view": "Xem chi tiết",
    "features.commands": "lệnh",
    "commands.kicker": "Thư viện lệnh",
    "commands.title": "Tìm kiếm lệnh",
    "commands.sub": "Tìm theo tên lệnh, mô tả, quyền hoặc nhóm tính năng. Kết quả hiển thị ngay khi bạn gõ.",
    "commands.search": "Tìm lệnh, tính năng, quyền… (ví dụ: info, chat, ban)",
    "commands.all": "Tất cả",
    "commands.noResults": "Không tìm thấy lệnh nào khớp với từ khoá của bạn. Hãy thử “info”, “chat”, “ban” hoặc “event”.",
    "commands.results": "kết quả",
    "commands.permission": "Quyền",
    "commands.example": "Ví dụ",
    "commands.ownerOnly": "Chỉ chủ bot",
    "commands.type.slash": "Slash",
    "commands.type.prefix": "Prefix",
    "commands.type.both": "Slash + Prefix",
    "commands.type.button": "Nút bấm",
    "help.kicker": "Trợ giúp",
    "help.title": "Xem trước Help Menu",
    "help.sub": "Đây là bản xem trước tương tác của Help Menu thật trong Discord. Chọn một nhóm bên dưới để xem nội dung.",
    "help.embedText": "Đây là help menu của bot. Dùng dropdown bên dưới để xem nhóm bạn muốn.",
    "help.categories": "Danh mục",
    "help.tip": "Mới bắt đầu? Hãy xem nhóm AI Chatbot hoặc War Ping / Backup Ping bên dưới để làm quen.",
    "help.pick": "Chọn một danh mục bên dưới để xem chi tiết",
    "help.selectLabel": "Danh mục trợ giúp",
    "help.selectPlaceholder": "Chọn một mục",
    "help.cmdTitle": "!help <feature>",
    "help.cmdSub": "Nhập một tính năng để chỉ xem hướng dẫn chi tiết của riêng nó — không hiển thị toàn bộ danh mục.",
    "help.cmdGo": "Xem",
    "help.tipsTitle": "Mẹo sử dụng",
    "help.tip1": "Dùng <code>/</code> để xem toàn bộ slash command của Nova.",
    "help.tip2": "Dùng tiền tố <code>!</code> cho các lệnh prefix như <code>!chat</code>, <code>!info</code>, <code>!help</code>.",
    "help.tip3": "Cấu hình kênh và vai trò bằng <code>/config</code> trước khi dùng War/Backup.",
    "help.notFound": "Không tìm thấy tính năng này. Hãy thử: chat, info, ban, mute, warping, image, event, banzone, persona, config, help.",
    "footer.owned": "Được phát triển và duy trì bởi <strong>nova_.inovation</strong>.",
    "footer.model": "Mô hình AI công khai",
    "footer.links": "Liên kết",
    "footer.supportTitle": "Hỗ trợ",
    "footer.supportLink": "Support Server",
    "footer.inviteLink": "Mời Nova",
    "footer.effective": "Ngày hiệu lực",
    "footer.rights": "Mọi quyền được bảo lưu.",
    "footer.note": "Trang web tĩnh chỉ mang tính giới thiệu. Nova không lưu trữ token hay khóa API trên trang này.",
    "legal.kicker": "Pháp lý",
    "legal.effective": "Ngày hiệu lực",
    "legal.contactTitle": "Liên hệ",
    "legal.contactText": "Nếu bạn có câu hỏi về chính sách này hoặc muốn yêu cầu xoá dữ liệu, hãy liên hệ:",
    "legal.email": "Email",
    "legal.support": "Support Server",
    "legal.owner": "Chủ sở hữu",
    "modal.close": "Đóng",
    "modal.commandsTitle": "Lệnh",
    "modal.featuresTitle": "Chi tiết",
    "modal.permsTitle": "Quyền cần thiết",
    "modal.examplesTitle": "Ví dụ",
    "modal.invite": "Mời Nova",
    "modal.support": "Support Server",
    "privacy.title": "Chính sách bảo mật",
    "privacy.lead": "Tài liệu này giải thích Nova xử lý những dữ liệu nào khi bạn sử dụng bot, vì sao cần thiết và bạn có những quyền gì.",
    "terms.title": "Điều khoản dịch vụ",
    "terms.lead": "Khi mời Nova vào server hoặc sử dụng bất kỳ tính năng nào của bot, bạn đồng ý với các điều khoản dưới đây."
  },
  en: {
    "meta.title": "Nova — AI Discord Bot",
    "a11y.skip": "Skip to content",
    "nav.home": "Home",
    "nav.features": "Features",
    "nav.commands": "Commands",
    "nav.help": "Help",
    "nav.privacy": "Privacy",
    "nav.terms": "Terms",
    "nav.invite": "Invite Nova",
    "hero.badge": "AI Discord Bot · Qwen3.7-max",
    "hero.sub": "Your intelligent Discord assistant for AI chat, AI image generation, War/Backup coordination, events, Ban Zone protection, moderation, and server management.",
    "hero.invite": "Invite Nova",
    "hero.support": "Join Support Server",
    "hero.explore": "Explore Features",
    "hero.stat1l": "Public AI model",
    "hero.stat2l": "Bot owner",
    "hero.stat3l": "Feature groups",
    "hero.stat4l": "Slash & prefix commands",
    "features.kicker": "Features",
    "features.title": "Everything Nova can do",
    "features.sub": "Click a feature category to see the full description, command list, required permissions and examples.",
    "features.view": "View details",
    "features.commands": "commands",
    "commands.kicker": "Command library",
    "commands.title": "Search commands",
    "commands.sub": "Search by command name, description, permission or feature group. Results update live as you type.",
    "commands.search": "Search commands, features, permissions… (e.g. info, chat, ban)",
    "commands.all": "All",
    "commands.noResults": "No commands matched your search. Try “info”, “chat”, “ban” or “event”.",
    "commands.results": "results",
    "commands.permission": "Permission",
    "commands.example": "Example",
    "commands.ownerOnly": "Bot owner only",
    "commands.type.slash": "Slash",
    "commands.type.prefix": "Prefix",
    "commands.type.both": "Slash + Prefix",
    "commands.type.button": "Button",
    "help.kicker": "Help",
    "help.title": "Help Menu preview",
    "help.sub": "This is an interactive preview of the bot's real Help Menu in Discord. Pick a category below to see its content.",
    "help.embedText": "This is the bot's help menu. Use the dropdown below to view the category you want.",
    "help.categories": "Categories",
    "help.tip": "New here? Check out the AI Chatbot or War Ping / Backup Ping category below to get started.",
    "help.pick": "Pick a category below for details",
    "help.selectLabel": "Help category",
    "help.selectPlaceholder": "Make a selection",
    "help.cmdTitle": "!help <feature>",
    "help.cmdSub": "Type a feature to see only its detailed help — the full category is not shown.",
    "help.cmdGo": "View",
    "help.tipsTitle": "Usage tips",
    "help.tip1": "Use <code>/</code> to browse all of Nova's slash commands.",
    "help.tip2": "Use the <code>!</code> prefix for prefix commands like <code>!chat</code>, <code>!info</code>, <code>!help</code>.",
    "help.tip3": "Configure channels and roles with <code>/config</code> before using War/Backup.",
    "help.notFound": "Feature not found. Try: chat, info, ban, mute, warping, image, event, banzone, persona, config, help.",
    "footer.owned": "Owned and maintained by <strong>nova_.inovation</strong>.",
    "footer.model": "Public AI model",
    "footer.links": "Links",
    "footer.supportTitle": "Support",
    "footer.supportLink": "Support Server",
    "footer.inviteLink": "Invite Nova",
    "footer.effective": "Effective date",
    "footer.rights": "All rights reserved.",
    "footer.note": "This is a static informational site. Nova does not store tokens or API keys on this page.",
    "legal.kicker": "Legal",
    "legal.effective": "Effective date",
    "legal.contactTitle": "Contact",
    "legal.contactText": "If you have questions about this policy or want to request data deletion, contact:",
    "legal.email": "Email",
    "legal.support": "Support Server",
    "legal.owner": "Owner",
    "modal.close": "Close",
    "modal.commandsTitle": "Commands",
    "modal.featuresTitle": "Details",
    "modal.permsTitle": "Required permissions",
    "modal.examplesTitle": "Examples",
    "modal.invite": "Invite Nova",
    "modal.support": "Support Server",
    "privacy.title": "Privacy Policy",
    "privacy.lead": "This document explains what data Nova processes when you use the bot, why it is needed, and what rights you have.",
    "terms.title": "Terms of Service",
    "terms.lead": "By inviting Nova to your server or using any of its features, you agree to the terms below."
  }
};

/* ============================================================
   FEATURE CATEGORIES
   ============================================================ */
const FEATURES = [
  {
    id: "ai",
    icon: "🤖",
    vi: {
      title: "AI Chatbot",
      short: "Trò chuyện với AI ngay trong Discord.",
      lead: "Chat với AI trực tiếp trong Discord, kèm lịch sử hội thoại riêng cho từng người dùng, tạo ảnh AI và persona tuỳ chỉnh.",
      details: [
        "AI chat trực tiếp trong Discord với mô hình công khai Qwen3.7-max.",
        "Mỗi người dùng có lịch sử hội thoại riêng, không ảnh hưởng lẫn nhau.",
        "Chế độ AI Channel biến kênh hiện tại thành kênh chat AI, không cần gõ <code>!chat</code>.",
        "Shared History cho phép cả kênh dùng chung một lịch sử hội thoại.",
        "Persona cho phép đổi phong cách trả lời theo mã có sẵn hoặc mô tả tự do.",
        "Tạo ảnh AI từ mô tả văn bản. Cocolink là nhà cung cấp chính, Gemini dùng làm dự phòng khi cần."
      ],
      perms: [
        "Gửi tin nhắn và nhúng liên kết trong kênh sử dụng.",
        "Đọc lịch sử tin nhắn (để xử lý ngữ cảnh hội thoại).",
        "Quản lý webhook nếu dùng tính năng AI Channel."
      ],
      examples: [
        "!chat Giải thích thuật toán sắp xếp nhanh bằng ví dụ đơn giản",
        "/image một phi hành gia mèo đang uống cà phê trên sao Hoả, phong cách điện ảnh",
        "!persona custom: Trả lời ngắn gọn, thân thiện và dùng emoji",
        "!language vi"
      ]
    },
    en: {
      title: "AI Chatbot",
      short: "Chat with AI directly inside Discord.",
      lead: "Chat with AI right inside Discord, with personal conversation history, AI image generation and custom personas.",
      details: [
        "AI chat directly inside Discord using the public model Qwen3.7-max.",
        "Every user keeps their own conversation history, isolated from others.",
        "AI Channel mode turns the current channel into an AI channel — no need to type <code>!chat</code>.",
        "Shared History lets a whole channel share one conversation history.",
        "Personas let you change the reply style using built-in codes or a free-form description.",
        "Generate AI images from text prompts. Cocolink is the primary provider, Gemini is used as fallback when needed."
      ],
      perms: [
        "Send Messages and Embed Links in the target channel.",
        "Read Message History (to process conversation context).",
        "Manage Webhooks if the AI Channel feature is used."
      ],
      examples: [
        "!chat Explain quicksort with a simple example",
        "/image a cat astronaut drinking coffee on Mars, cinematic style",
        "!persona custom: Reply briefly, stay friendly and use emojis",
        "!language en"
      ]
    },
    commands: [
      { name: "!chat <message>", type: "prefix", vi: { d: "Trò chuyện với AI trong Discord.", p: "Send Messages" }, en: { d: "Chat with the AI inside Discord.", p: "Send Messages" }, ex: "!chat Xin chào Nova!" },
      { name: "/chat", type: "slash", vi: { d: "Phiên bản slash command của AI chat.", p: "Send Messages" }, en: { d: "Slash command version of AI chat.", p: "Send Messages" }, ex: "/chat message: Giải thích Docker" },
      { name: "!image <prompt>", type: "prefix", vi: { d: "Tạo ảnh AI từ mô tả văn bản.", p: "Send Messages, Attach Files" }, en: { d: "Generate an AI image from a text prompt.", p: "Send Messages, Attach Files" }, ex: "!image thành phố tương lai lúc hoàng hôn" },
      { name: "/image", type: "slash", vi: { d: "Tạo ảnh AI bằng slash command.", p: "Send Messages, Attach Files" }, en: { d: "Generate an AI image via slash command.", p: "Send Messages, Attach Files" }, ex: "/image prompt: rồng neon trên bầu trời" },
      { name: "!clearchat", type: "prefix", vi: { d: "Xoá lịch sử hội thoại AI của riêng bạn.", p: "Send Messages" }, en: { d: "Clear your own AI conversation history.", p: "Send Messages" } },
      { name: "/clearchat", type: "slash", vi: { d: "Xoá lịch sử hội thoại AI của bạn (slash).", p: "Send Messages" }, en: { d: "Clear your AI conversation history (slash).", p: "Send Messages" } },
      { name: "!setai", type: "prefix", vi: { d: "Biến kênh hiện tại thành AI Channel.", p: "Manage Channels" }, en: { d: "Turn the current channel into an AI channel.", p: "Manage Channels" } },
      { name: "/setai", type: "slash", vi: { d: "Biến kênh hiện tại thành AI Channel (slash).", p: "Manage Channels" }, en: { d: "Turn the current channel into an AI channel (slash).", p: "Manage Channels" } },
      { name: "!unsetai", type: "prefix", vi: { d: "Tắt chế độ AI Channel của kênh hiện tại.", p: "Manage Channels" }, en: { d: "Disable AI Channel mode for the current channel.", p: "Manage Channels" } },
      { name: "!setsharedhistory", type: "prefix", vi: { d: "Cho kênh dùng chung lịch sử hội thoại AI.", p: "Manage Channels" }, en: { d: "Let a channel use shared AI conversation history.", p: "Manage Channels" } },
      { name: "/setsharedhistory", type: "slash", vi: { d: "Bật shared history cho kênh (slash).", p: "Manage Channels" }, en: { d: "Enable shared history for a channel (slash).", p: "Manage Channels" } },
      { name: "!unsetsharedhistory", type: "prefix", vi: { d: "Tắt shared history của kênh.", p: "Manage Channels" }, en: { d: "Disable the channel's shared history.", p: "Manage Channels" } },
      { name: "!persona <code>", type: "prefix", vi: { d: "Đổi persona AI theo mã có sẵn.", p: "Send Messages" }, en: { d: "Change AI persona using a built-in code.", p: "Send Messages" }, ex: "!persona teacher" },
      { name: "!persona custom: <description>", type: "prefix", vi: { d: "Tạo persona AI tuỳ chỉnh bằng mô tả tự do.", p: "Send Messages" }, en: { d: "Create a custom AI persona with a free-form description.", p: "Send Messages" }, ex: "!persona custom: Nói chuyện như một cố vấn thân thiện" },
      { name: "/persona", type: "slash", vi: { d: "Đổi persona AI bằng slash command.", p: "Send Messages" }, en: { d: "Change the AI persona via slash command.", p: "Send Messages" } },
      { name: "!mypersona", type: "prefix", vi: { d: "Xem persona AI hiện tại của bạn.", p: "Send Messages" }, en: { d: "View your current AI persona.", p: "Send Messages" } },
      { name: "/mypersona", type: "slash", vi: { d: "Xem persona hiện tại (slash).", p: "Send Messages" }, en: { d: "View your current persona (slash).", p: "Send Messages" } },
      { name: "!resetpersona", type: "prefix", vi: { d: "Đưa persona AI về mặc định.", p: "Send Messages" }, en: { d: "Reset your AI persona to default.", p: "Send Messages" } },
      { name: "/resetpersona", type: "slash", vi: { d: "Reset persona về mặc định (slash).", p: "Send Messages" }, en: { d: "Reset persona to default (slash).", p: "Send Messages" } },
      { name: "!language <vi|en>", type: "prefix", vi: { d: "Đặt ngôn ngữ trả lời của AI cho bạn.", p: "Send Messages" }, en: { d: "Set the AI reply language for yourself.", p: "Send Messages" }, ex: "!language vi" },
      { name: "/language", type: "slash", vi: { d: "Đặt ngôn ngữ AI (slash).", p: "Send Messages" }, en: { d: "Set the AI language (slash).", p: "Send Messages" } }
    ]
  },
  {
    id: "moderation",
    icon: "🛡️",
    vi: {
      title: "Moderation",
      short: "Công cụ kiểm duyệt thành viên.",
      lead: "Bộ lệnh kiểm duyệt cơ bản nhưng chặt chẽ: ban, unban, timeout và gỡ timeout — kèm kiểm tra thứ bậc vai trò.",
      details: [
        "<code>/ban</code> cấm một thành viên khỏi server.",
        "<code>/unban</code> bỏ cấm bằng User ID để nhận diện chính xác.",
        "<code>/mute</code> timeout thành viên, thời lượng tối đa 28 ngày.",
        "<code>/unmute</code> gỡ timeout của thành viên.",
        "Bot cần thứ bậc vai trò cao hơn mục tiêu mới có thể hành động.",
        "Chủ server không thể bị bot ban."
      ],
      perms: [
        "Ban Members — cho <code>/ban</code> và <code>/unban</code>.",
        "Moderate Members — cho <code>/mute</code> và <code>/unmute</code>.",
        "Vai trò của bot phải nằm cao hơn vai trò của mục tiêu."
      ],
      examples: [
        "/ban user: @Spammer reason: Spam quảng cáo",
        "/unban user_id: 123456789012345678",
        "/mute user: @Noisy duration: 10m reason: Spam chat",
        "/mute user: @Noisy duration: 7d reason: Vi phạm nhiều lần"
      ]
    },
    en: {
      title: "Moderation",
      short: "Member moderation toolkit.",
      lead: "A focused moderation set: ban, unban, timeout and untimeout — with proper role hierarchy checks.",
      details: [
        "<code>/ban</code> bans a member from the server.",
        "<code>/unban</code> unbans a user by precise User ID.",
        "<code>/mute</code> times out a member, maximum duration 28 days.",
        "<code>/unmute</code> removes a member's timeout.",
        "The bot needs a higher role than the target to act.",
        "The server owner can never be banned by the bot."
      ],
      perms: [
        "Ban Members — for <code>/ban</code> and <code>/unban</code>.",
        "Moderate Members — for <code>/mute</code> and <code>/unmute</code>.",
        "The bot's role must sit above the target's highest role."
      ],
      examples: [
        "/ban user: @Spammer reason: Advertising spam",
        "/unban user_id: 123456789012345678",
        "/mute user: @Noisy duration: 10m reason: Chat spam",
        "/mute user: @Noisy duration: 7d reason: Repeated violations"
      ]
    },
    commands: [
      { name: "/ban", type: "slash", vi: { d: "Ban thành viên được chọn khỏi server.", p: "Ban Members" }, en: { d: "Ban the selected member from the server.", p: "Ban Members" }, ex: "/ban user: @User reason: Spam" },
      { name: "/unban", type: "slash", vi: { d: "Bỏ cấm người dùng bằng User ID.", p: "Ban Members" }, en: { d: "Unban a user using their User ID.", p: "Ban Members" }, ex: "/unban user_id: 123456789012345678" },
      { name: "/mute", type: "slash", vi: { d: "Timeout thành viên. Thời lượng tối đa 28 ngày (10m, 2h, 7d).", p: "Moderate Members" }, en: { d: "Timeout a member. Max 28 days (10m, 2h, 7d).", p: "Moderate Members" }, ex: "/mute user: @User duration: 2h reason: Spam" },
      { name: "/unmute", type: "slash", vi: { d: "Gỡ timeout cho thành viên.", p: "Moderate Members" }, en: { d: "Remove a member's timeout.", p: "Moderate Members" }, ex: "/unmute user: @User" }
    ]
  },
  {
    id: "banzone",
    icon: "⚠️",
    vi: {
      title: "Ban Zone",
      short: "Hệ thống bảo vệ server.",
      lead: "Ban Zone là hệ thống bảo vệ server: khi kênh bị xâm phạm, Nova xử lý người vi phạm theo chế độ đã cấu hình, kèm whitelist theo từng server.",
      details: [
        "Chế độ Ban: <code>/banzone mode:ban</code> — xử lý người vi phạm bằng ban.",
        "Chế độ Mute: <code>/banzone mode:mute duration:10m</code> — xử lý bằng timeout.",
        "<code>/setbanchannel true|false</code> đặt kênh hiện tại làm kênh Ban Zone và bật/tắt hệ thống.",
        "Whitelist theo từng server: whitelist ở Server A <strong>không</strong> ảnh hưởng Server B.",
        "Chỉ chủ server quản lý được whitelist Ban Zone. Administrator / Manage Server không đủ điều kiện cho lệnh whitelist.",
        "<code>/bandebug @user</code> kiểm tra bot có thể hành động lên thành viên được chọn hay không.",
        "Thứ bậc vai trò quan trọng — chủ server không thể bị bot ban, và quyền của mục tiêu không vượt qua thứ bậc vai trò.",
        "Có thể dọn tin nhắn gần đây theo hành vi của bot.",
        "Cấu hình kênh được cô lập theo từng server.",
        "Bảo vệ xoá kênh: nếu kênh Ban Zone bị xoá, Nova cố gắng xác định người thực hiện qua audit log của Discord và xử lý theo logic bảo vệ. Nova <strong>không</strong> ban người đã mời bot chỉ vì một kênh bị xoá."
      ],
      perms: [
        "Manage Channels — để cấu hình kênh Ban Zone.",
        "Ban Members / Moderate Members — tuỳ chế độ đã chọn.",
        "Chỉ <strong>chủ server</strong> được quản lý whitelist Ban Zone.",
        "Vai trò của bot phải cao hơn vai trò của mục tiêu."
      ],
      examples: [
        "/setbanchannel true",
        "/banzone mode:ban",
        "/banzone mode:mute duration:10m",
        "/banwhitelist add @TrustedUser",
        "/banwhitelist list",
        "/bandebug @SomeUser"
      ]
    },
    en: {
      title: "Ban Zone",
      short: "Server protection system.",
      lead: "Ban Zone is a server protection system: when a channel is compromised, Nova processes offenders according to the configured mode, with a per-server whitelist.",
      details: [
        "Ban Mode: <code>/banzone mode:ban</code> — process offenders with a ban.",
        "Mute Mode: <code>/banzone mode:mute duration:10m</code> — process offenders with a timeout.",
        "<code>/setbanchannel true|false</code> configures the current channel as the Ban Zone channel and enables or disables the system.",
        "Whitelist is per-server: a whitelist in Server A does <strong>not</strong> affect Server B.",
        "Only the server owner can manage the Ban Zone whitelist. Administrator / Manage Server alone is not enough for whitelist commands.",
        "<code>/bandebug @user</code> tests whether the bot can act on the selected member.",
        "Role hierarchy matters — the server owner can never be banned by the bot, and target permissions do not override role hierarchy.",
        "Recent messages can be cleaned according to the bot behaviour.",
        "Channel configuration is isolated per server.",
        "Channel deletion protection: if the configured Ban Zone channel is deleted, Nova attempts to detect the executor through Discord audit logs and handles them according to its protection logic. Nova does <strong>not</strong> ban the person who originally invited the bot merely because a channel was deleted."
      ],
      perms: [
        "Manage Channels — to configure the Ban Zone channel.",
        "Ban Members / Moderate Members — depending on the selected mode.",
        "Only the <strong>server owner</strong> can manage the Ban Zone whitelist.",
        "The bot's role must be higher than the target's role."
      ],
      examples: [
        "/setbanchannel true",
        "/banzone mode:ban",
        "/banzone mode:mute duration:10m",
        "/banwhitelist add @TrustedUser",
        "/banwhitelist list",
        "/bandebug @SomeUser"
      ]
    },
    commands: [
      { name: "/banzone mode:ban", type: "slash", vi: { d: "Đặt Ban Zone ở chế độ Ban.", p: "Manage Channels" }, en: { d: "Set Ban Zone to Ban Mode.", p: "Manage Channels" } },
      { name: "/banzone mode:mute duration:10m", type: "slash", vi: { d: "Đặt Ban Zone ở chế độ Mute với thời lượng.", p: "Manage Channels" }, en: { d: "Set Ban Zone to Mute Mode with a duration.", p: "Manage Channels" }, ex: "/banzone mode:mute duration:10m" },
      { name: "/setbanchannel true|false", type: "slash", vi: { d: "Cấu hình kênh hiện tại làm kênh Ban Zone, bật hoặc tắt.", p: "Manage Channels" }, en: { d: "Configure the current channel as the Ban Zone channel, enable or disable.", p: "Manage Channels" } },
      { name: "/banwhitelist add @user", type: "slash", vi: { d: "Thêm người dùng vào whitelist Ban Zone của server.", p: "Server Owner" }, en: { d: "Add a user to the server's Ban Zone whitelist.", p: "Server Owner" } },
      { name: "/banwhitelist remove @user", type: "slash", vi: { d: "Xoá người dùng khỏi whitelist Ban Zone.", p: "Server Owner" }, en: { d: "Remove a user from the Ban Zone whitelist.", p: "Server Owner" } },
      { name: "/banwhitelist list", type: "slash", vi: { d: "Xem danh sách whitelist Ban Zone của server.", p: "Server Owner" }, en: { d: "View the server's Ban Zone whitelist.", p: "Server Owner" } },
      { name: "/bandebug @user", type: "slash", vi: { d: "Kiểm tra bot có thể hành động lên thành viên được chọn.", p: "Manage Channels" }, en: { d: "Test whether the bot can act on the selected member.", p: "Manage Channels" }, ex: "/bandebug @User" }
    ]
  },
  {
    id: "war",
    icon: "⚔️",
    vi: {
      title: "War Ping / Backup Ping",
      short: "Điều phối War và Backup.",
      lead: "Tạo yêu cầu War Ping hoặc Backup Ping, thu thập thông tin cần thiết và mở thread điều phối với các nút hành động.",
      details: [
        "War: tạo yêu cầu War Ping, thu thập enemy/clan, khu vực, link/mã server Roblox, và mở thread điều phối.",
        "Backup: tạo yêu cầu Backup Ping, thu thập thông tin cần thiết và mở thread điều phối.",
        "Nút hành động: <code>WAR</code>, <code>BACKUP</code>, <code>WIN</code>, <code>LOSE</code>, <code>END</code>.",
        "Có thể cấu hình quyền quyết định việc thành viên thường có được bấm nút kết quả War/Backup hay không.",
        "Kết thúc toàn bộ: <code>/end all</code> kết thúc mọi phiên War/Backup đang hoạt động trong server hiện tại.",
        "Call Hacker: <code>/callhacker show</code> và <code>/callhacker hide</code> để hiện/ẩn nút Call Hacker, cấu hình bởi quyền quản lý.",
        "Vai trò cấu hình được: War Ping Role, Backup Ping Role, Joined War Role, Joined Backup Role, Hacker Role.",
        "Trusted users: <code>/trust add</code>, <code>/trust remove</code>, <code>/trust list</code> — người dùng tin cậy nhận quyền quản lý War theo hệ thống phân quyền của bot."
      ],
      perms: [
        "Manage Roles — để cấu hình các vai trò War/Backup.",
        "Manage Channels / Manage Threads — để tạo thread điều phối.",
        "Quyền quản lý cần thiết để dùng <code>/callhacker</code> và <code>/trust</code>."
      ],
      examples: [
        "/end all",
        "/callhacker show",
        "/callhacker hide",
        "/trust add @User",
        "/trust list"
      ]
    },
    en: {
      title: "War Ping / Backup Ping",
      short: "War and Backup coordination.",
      lead: "Create War Ping or Backup Ping requests, collect required information and open a coordination thread with action buttons.",
      details: [
        "War: create a War Ping request, collect enemy/clan, region, Roblox server link/code, and open a coordination thread.",
        "Backup: create a Backup Ping request, collect the required information, and open a coordination thread.",
        "Action buttons: <code>WAR</code>, <code>BACKUP</code>, <code>WIN</code>, <code>LOSE</code>, <code>END</code>.",
        "A configurable permission determines whether regular members can press the War/Backup result buttons.",
        "Global ending: <code>/end all</code> ends all active War/Backup sessions in the current server.",
        "Call Hacker: <code>/callhacker show</code> and <code>/callhacker hide</code> show or hide the Call Hacker button, configurable by manager-level permissions.",
        "Configurable roles: War Ping Role, Backup Ping Role, Joined War Role, Joined Backup Role, Hacker Role.",
        "Trusted users: <code>/trust add</code>, <code>/trust remove</code>, <code>/trust list</code> — trusted users receive War management access according to the bot's permission system."
      ],
      perms: [
        "Manage Roles — to configure the War/Backup roles.",
        "Manage Channels / Manage Threads — to create coordination threads.",
        "Manager-level permissions for <code>/callhacker</code> and <code>/trust</code>."
      ],
      examples: [
        "/end all",
        "/callhacker show",
        "/callhacker hide",
        "/trust add @User",
        "/trust list"
      ]
    },
    commands: [
      { name: "WAR", type: "button", vi: { d: "Nút tạo yêu cầu War Ping.", p: "Configurable" }, en: { d: "Button to create a War Ping request.", p: "Configurable" } },
      { name: "BACKUP", type: "button", vi: { d: "Nút tạo yêu cầu Backup Ping.", p: "Configurable" }, en: { d: "Button to create a Backup Ping request.", p: "Configurable" } },
      { name: "WIN", type: "button", vi: { d: "Đánh dấu kết quả War/Backup là thắng.", p: "Configurable" }, en: { d: "Mark the War/Backup result as a win.", p: "Configurable" } },
      { name: "LOSE", type: "button", vi: { d: "Đánh dấu kết quả War/Backup là thua.", p: "Configurable" }, en: { d: "Mark the War/Backup result as a loss.", p: "Configurable" } },
      { name: "END", type: "button", vi: { d: "Kết thúc phiên War/Backup hiện tại.", p: "Configurable" }, en: { d: "End the current War/Backup session.", p: "Configurable" } },
      { name: "/end all", type: "slash", vi: { d: "Kết thúc mọi phiên War/Backup đang hoạt động trong server.", p: "Manage Threads" }, en: { d: "End all active War/Backup sessions in the server.", p: "Manage Threads" } },
      { name: "/trust add", type: "slash", vi: { d: "Thêm người dùng vào danh sách tin cậy.", p: "Manager" }, en: { d: "Add a user to the trusted list.", p: "Manager" } },
      { name: "/trust remove", type: "slash", vi: { d: "Xoá người dùng khỏi danh sách tin cậy.", p: "Manager" }, en: { d: "Remove a user from the trusted list.", p: "Manager" } },
      { name: "/trust list", type: "slash", vi: { d: "Xem danh sách người dùng tin cậy.", p: "Manager" }, en: { d: "View the trusted users list.", p: "Manager" } },
      { name: "/helppanel", type: "slash", vi: { d: "Gửi bảng hướng dẫn War/Backup vào kênh.", p: "Manage Channels" }, en: { d: "Send the War/Backup help panel to a channel.", p: "Manage Channels" } },
      { name: "/callhacker show", type: "slash", vi: { d: "Hiện nút Call Hacker.", p: "Manager" }, en: { d: "Show the Call Hacker button.", p: "Manager" } },
      { name: "/callhacker hide", type: "slash", vi: { d: "Ẩn nút Call Hacker.", p: "Manager" }, en: { d: "Hide the Call Hacker button.", p: "Manager" } }
    ]
  },
  {
    id: "event",
    icon: "🏆",
    vi: {
      title: "Tạo event",
      short: "Tạo và quản lý sự kiện.",
      lead: "Gửi sự kiện, quản lý người tham gia và blacklist — tất cả qua nhóm lệnh <code>/event</code>.",
      details: [
        "<code>/event send</code> gửi và tạo sự kiện trong server.",
        "<code>/event test</code> kiểm tra hệ thống sự kiện.",
        "<code>/event participants</code> xem danh sách người tham gia.",
        "<code>/event count</code> đếm số người tham gia.",
        "<code>/event remove</code> xoá một người tham gia.",
        "<code>/event clear</code> xoá dữ liệu/người tham gia khi phù hợp.",
        "Blacklist: <code>/event blacklist add</code>, <code>/event blacklist remove</code>, <code>/event blacklist list</code>."
      ],
      perms: [
        "Manage Events / Manage Channels — để gửi và quản lý sự kiện.",
        "Quyền quản lý cần thiết để dùng blacklist sự kiện."
      ],
      examples: [
        "/event send title: Giải đấu cuối tuần",
        "/event participants",
        "/event count",
        "/event blacklist add @User"
      ]
    },
    en: {
      title: "Create events",
      short: "Create and manage events.",
      lead: "Send events, manage participants and blacklist — all through the <code>/event</code> command group.",
      details: [
        "<code>/event send</code> sends and creates an event in the server.",
        "<code>/event test</code> tests the event system.",
        "<code>/event participants</code> views the participant list.",
        "<code>/event count</code> counts participants.",
        "<code>/event remove</code> removes a participant.",
        "<code>/event clear</code> clears event participants/data when applicable.",
        "Blacklist: <code>/event blacklist add</code>, <code>/event blacklist remove</code>, <code>/event blacklist list</code>."
      ],
      perms: [
        "Manage Events / Manage Channels — to send and manage events.",
        "Manager-level permissions to use the event blacklist."
      ],
      examples: [
        "/event send title: Weekend Tournament",
        "/event participants",
        "/event count",
        "/event blacklist add @User"
      ]
    },
    commands: [
      { name: "/event send", type: "slash", vi: { d: "Gửi và tạo sự kiện.", p: "Manage Events" }, en: { d: "Send and create an event.", p: "Manage Events" } },
      { name: "/event test", type: "slash", vi: { d: "Kiểm tra hệ thống sự kiện.", p: "Manage Events" }, en: { d: "Test the event system.", p: "Manage Events" } },
      { name: "/event participants", type: "slash", vi: { d: "Xem danh sách người tham gia.", p: "Manage Events" }, en: { d: "View the participant list.", p: "Manage Events" } },
      { name: "/event count", type: "slash", vi: { d: "Đếm số người tham gia.", p: "Manage Events" }, en: { d: "Count participants.", p: "Manage Events" } },
      { name: "/event remove", type: "slash", vi: { d: "Xoá một người tham gia.", p: "Manage Events" }, en: { d: "Remove a participant.", p: "Manage Events" } },
      { name: "/event clear", type: "slash", vi: { d: "Xoá dữ liệu/người tham gia sự kiện khi phù hợp.", p: "Manage Events" }, en: { d: "Clear event participants/data when applicable.", p: "Manage Events" } },
      { name: "/event blacklist add", type: "slash", vi: { d: "Thêm người dùng vào blacklist sự kiện.", p: "Manager" }, en: { d: "Add a user to the event blacklist.", p: "Manager" } },
      { name: "/event blacklist remove", type: "slash", vi: { d: "Xoá người dùng khỏi blacklist sự kiện.", p: "Manager" }, en: { d: "Remove a user from the event blacklist.", p: "Manager" } },
      { name: "/event blacklist list", type: "slash", vi: { d: "Xem blacklist sự kiện.", p: "Manager" }, en: { d: "View the event blacklist.", p: "Manager" } }
    ]
  },
  {
    id: "serverinfo",
    icon: "📊",
    vi: {
      title: "Server Information",
      short: "Thông tin bot, server và người dùng.",
      lead: "Nhóm lệnh thông tin giúp bạn xem chi tiết về bot, server và thành viên — bao gồm cả bản prefix mới <code>!info</code>.",
      details: [
        "<code>/info</code> và <code>!info</code> đều mở bảng thông tin bot. <code>!info</code> là bản prefix mới được thêm.",
        "Bảng thông tin bot gồm: tên bot, Bot ID, chủ sở hữu, thời gian tạo, độ trễ, uptime, phiên bản Python, phiên bản discord.py, tổng server, tổng người dùng, tổng kênh.",
        "Bảng còn hiển thị: trạng thái AI, mô hình AI, số phiên War đang hoạt động, số phiên Backup đang hoạt động, trusted users, kênh Ban Zone, số lượng whitelist Ban Zone, kênh Help, chế độ Ban Zone, số slash command, số prefix command.",
        "Phần chi tiết server hiện tại: thông tin server, chủ server, số thành viên, thứ bậc vai trò của bot, quyền của bot.",
        "<code>/serverinfo</code> hiển thị: tên server, Server ID, chủ sở hữu, số thành viên, kênh, vai trò, boost, xác minh, tính năng, icon/banner của server.",
        "<code>/userinfo</code> hiển thị: thông tin người dùng, ngày tạo tài khoản, ngày tham gia server, vai trò, trạng thái, nền tảng, hoạt động, biệt danh, boost, trạng thái timeout."
      ],
      perms: [
        "Send Messages và Embed Links trong kênh sử dụng.",
        "Không yêu cầu quyền quản lý."
      ],
      examples: [
        "/info",
        "!info",
        "/serverinfo",
        "/userinfo user: @Member"
      ]
    },
    en: {
      title: "Server Information",
      short: "Bot, server and user information.",
      lead: "Information commands to inspect the bot, server and members — including the newly added prefix version <code>!info</code>.",
      details: [
        "<code>/info</code> and <code>!info</code> both open the bot information panel. <code>!info</code> is the newly added prefix version.",
        "The bot information panel includes: bot name, Bot ID, owner, creation time, latency, uptime, Python version, discord.py version, total servers, total users, total channels.",
        "It also shows: AI status, AI model, active War sessions, active Backup sessions, trusted users, Ban Zone channel, Ban whitelist count, Help channel, Ban Zone mode, slash command count, prefix command count.",
        "Current server details: server info, server owner, member count, bot role hierarchy, bot permissions.",
        "<code>/serverinfo</code> shows: server name, Server ID, owner, member counts, channels, roles, boosts, verification, features, server icon/banner.",
        "<code>/userinfo</code> shows: user information, account creation, server join, roles, status, platform, activity, nickname, boost, timeout status."
      ],
      perms: [
        "Send Messages and Embed Links in the target channel.",
        "No management permission required."
      ],
      examples: [
        "/info",
        "!info",
        "/serverinfo",
        "/userinfo user: @Member"
      ]
    },
    commands: [
      { name: "/info", type: "slash", vi: { d: "Xem bảng thông tin bot: uptime, độ trễ, AI, War/Backup, Ban Zone và chi tiết server hiện tại.", p: "Send Messages" }, en: { d: "View the bot info panel: uptime, latency, AI, War/Backup, Ban Zone and current-server details.", p: "Send Messages" } },
      { name: "!info", type: "prefix", vi: { d: "Bản prefix của /info — xem bảng thông tin bot đầy đủ.", p: "Send Messages" }, en: { d: "Prefix version of /info — view the full bot information panel.", p: "Send Messages" }, ex: "!info" },
      { name: "/serverinfo", type: "slash", vi: { d: "Xem thông tin server: tên, ID, chủ sở hữu, thành viên, kênh, vai trò, boost, xác minh, tính năng, icon/banner.", p: "Send Messages" }, en: { d: "View server information: name, ID, owner, members, channels, roles, boosts, verification, features, icon/banner.", p: "Send Messages" } },
      { name: "/userinfo", type: "slash", vi: { d: "Xem thông tin người dùng: tài khoản, tham gia server, vai trò, trạng thái, nền tảng, hoạt động, biệt danh, boost, timeout.", p: "Send Messages" }, en: { d: "View user information: account, server join, roles, status, platform, activity, nickname, boost, timeout.", p: "Send Messages" } }
    ]
  },
  {
    id: "config",
    icon: "⚙️",
    vi: {
      title: "Configuration",
      short: "Cấu hình server.",
      lead: "Cấu hình kênh, vai trò và các thiết lập mà hệ thống War/Backup và Help sử dụng.",
      details: [
        "<code>/config view</code> xem toàn bộ cấu hình hiện tại của server.",
        "<code>/config help_channel</code> đặt kênh nhận bảng hướng dẫn.",
        "<code>/config war_ping_role</code> đặt vai trò được ping cho War.",
        "<code>/config backup_ping_role</code> đặt vai trò được ping cho Backup.",
        "<code>/config joined_war_role</code> đặt vai trò cấp cho người tham gia War.",
        "<code>/config joined_backup_role</code> đặt vai trò cấp cho người tham gia Backup.",
        "<code>/config hacker_role</code> đặt vai trò cho Call Hacker."
      ],
      perms: [
        "Manage Server / Manage Roles — để thay đổi cấu hình.",
        "Manage Channels — để đặt kênh help."
      ],
      examples: [
        "/config view",
        "/config war_ping_role role: @WarPing",
        "/config help_channel channel: #help"
      ]
    },
    en: {
      title: "Configuration",
      short: "Server configuration.",
      lead: "Configure channels, roles and the settings used by the War/Backup and Help systems.",
      details: [
        "<code>/config view</code> shows the server's current configuration.",
        "<code>/config help_channel</code> sets the channel that receives the help panel.",
        "<code>/config war_ping_role</code> sets the role pinged for War.",
        "<code>/config backup_ping_role</code> sets the role pinged for Backup.",
        "<code>/config joined_war_role</code> sets the role granted to War participants.",
        "<code>/config joined_backup_role</code> sets the role granted to Backup participants.",
        "<code>/config hacker_role</code> sets the role for Call Hacker."
      ],
      perms: [
        "Manage Server / Manage Roles — to change configuration.",
        "Manage Channels — to set the help channel."
      ],
      examples: [
        "/config view",
        "/config war_ping_role role: @WarPing",
        "/config help_channel channel: #help"
      ]
    },
    commands: [
      { name: "/config view", type: "slash", vi: { d: "Xem cấu hình hiện tại của server.", p: "Manage Server" }, en: { d: "View the server's current configuration.", p: "Manage Server" } },
      { name: "/config help_channel", type: "slash", vi: { d: "Đặt kênh nhận bảng hướng dẫn.", p: "Manage Channels" }, en: { d: "Set the channel that receives the help panel.", p: "Manage Channels" } },
      { name: "/config war_ping_role", type: "slash", vi: { d: "Đặt vai trò War Ping.", p: "Manage Roles" }, en: { d: "Set the War Ping role.", p: "Manage Roles" } },
      { name: "/config backup_ping_role", type: "slash", vi: { d: "Đặt vai trò Backup Ping.", p: "Manage Roles" }, en: { d: "Set the Backup Ping role.", p: "Manage Roles" } },
      { name: "/config joined_war_role", type: "slash", vi: { d: "Đặt vai trò cho người tham gia War.", p: "Manage Roles" }, en: { d: "Set the role for War participants.", p: "Manage Roles" } },
      { name: "/config joined_backup_role", type: "slash", vi: { d: "Đặt vai trò cho người tham gia Backup.", p: "Manage Roles" }, en: { d: "Set the role for Backup participants.", p: "Manage Roles" } },
      { name: "/config hacker_role", type: "slash", vi: { d: "Đặt vai trò Call Hacker.", p: "Manage Roles" }, en: { d: "Set the Call Hacker role.", p: "Manage Roles" } }
    ]
  },
  {
    id: "help",
    icon: "📖",
    vi: {
      title: "Help System",
      short: "Hệ thống trợ giúp.",
      lead: "<code>!help</code> mở Help Menu chính theo danh mục. <code>!help &lt;feature&gt;</code> chỉ hiển thị hướng dẫn chi tiết của riêng tính năng đó.",
      details: [
        "<code>!help</code> mở Help Menu chính theo danh mục.",
        "<code>/help</code> là bản slash command tương đương.",
        "<code>!help &lt;feature&gt;</code> chỉ hiển thị hướng dẫn chi tiết của tính năng được yêu cầu — không hiển thị toàn bộ danh mục.",
        "Ví dụ: <code>!help chat</code>, <code>!help info</code>, <code>!help ban</code>, <code>!help mute</code>, <code>!help warping</code>."
      ],
      perms: ["Send Messages trong kênh sử dụng."],
      examples: [
        "!help",
        "/help",
        "!help chat",
        "!help info",
        "!help warping"
      ]
    },
    en: {
      title: "Help System",
      short: "Help system.",
      lead: "<code>!help</code> opens the main Categories Help Menu. <code>!help &lt;feature&gt;</code> shows only the detailed help for that specific feature.",
      details: [
        "<code>!help</code> opens the main Categories Help Menu.",
        "<code>/help</code> is the equivalent slash command.",
        "<code>!help &lt;feature&gt;</code> shows only the detailed help for the requested feature — the entire category is not shown.",
        "Examples: <code>!help chat</code>, <code>!help info</code>, <code>!help ban</code>, <code>!help mute</code>, <code>!help warping</code>."
      ],
      perms: ["Send Messages in the target channel."],
      examples: [
        "!help",
        "/help",
        "!help chat",
        "!help info",
        "!help warping"
      ]
    },
    commands: [
      { name: "!help", type: "prefix", vi: { d: "Mở Help Menu chính theo danh mục.", p: "Send Messages" }, en: { d: "Open the main Categories Help Menu.", p: "Send Messages" } },
      { name: "/help", type: "slash", vi: { d: "Bản slash command của Help Menu.", p: "Send Messages" }, en: { d: "Slash command version of the Help Menu.", p: "Send Messages" } },
      { name: "!help <feature>", type: "prefix", vi: { d: "Chỉ hiển thị hướng dẫn chi tiết của một tính năng cụ thể.", p: "Send Messages" }, en: { d: "Show only the detailed help for one specific feature.", p: "Send Messages" }, ex: "!help info" }
    ]
  },
  {
    id: "admin",
    icon: "🔐",
    vi: {
      title: "Admin",
      short: "Lệnh chỉ dành cho chủ bot.",
      lead: "Nhóm lệnh quản trị chỉ chủ bot sử dụng được: quản lý API key Cocolink, đồng bộ lệnh và các tiện ích nội bộ.",
      details: [
        "Tất cả lệnh trong nhóm này <strong>chỉ chủ bot</strong> sử dụng được.",
        "Quản lý API key Cocolink: đăng ký, thêm, kiểm tra, thử, xoá và xoá sạch key.",
        "Đổi nhà cung cấp API và đồng bộ slash command.",
        "Không có thông tin bí mật nào (token, API key, mật khẩu) được hiển thị trên trang web này."
      ],
      perms: ["Bot owner only."],
      examples: [
        "!checkkey",
        "!testkey",
        "!sync"
      ]
    },
    en: {
      title: "Admin",
      short: "Bot-owner-only commands.",
      lead: "Administrative commands only the bot owner can use: Cocolink API key management, command syncing and internal utilities.",
      details: [
        "Every command in this group is <strong>bot owner only</strong>.",
        "Cocolink API key management: register, add, check, test, delete and clear keys.",
        "Change the API provider and sync slash commands.",
        "No secret information (tokens, API keys, passwords) is ever displayed on this website."
      ],
      perms: ["Bot owner only."],
      examples: [
        "!checkkey",
        "!testkey",
        "!sync"
      ]
    },
    commands: [
      { name: "!reg", type: "prefix", vi: { d: "Đăng ký API key Cocolink.", p: "Bot owner" }, en: { d: "Register a Cocolink API key.", p: "Bot owner" }, owner: true },
      { name: "!napkey", type: "prefix", vi: { d: "Nạp API key Cocolink.", p: "Bot owner" }, en: { d: "Load a Cocolink API key.", p: "Bot owner" }, owner: true },
      { name: "!addkey", type: "prefix", vi: { d: "Thêm API key Cocolink.", p: "Bot owner" }, en: { d: "Add a Cocolink API key.", p: "Bot owner" }, owner: true },
      { name: "!checkkey", type: "prefix", vi: { d: "Kiểm tra trạng thái API key hiện có.", p: "Bot owner" }, en: { d: "Check the status of existing API keys.", p: "Bot owner" }, owner: true },
      { name: "!testkey", type: "prefix", vi: { d: "Thử nghiệm API key.", p: "Bot owner" }, en: { d: "Test an API key.", p: "Bot owner" }, owner: true },
      { name: "!delkey", type: "prefix", vi: { d: "Xoá một API key.", p: "Bot owner" }, en: { d: "Delete an API key.", p: "Bot owner" }, owner: true },
      { name: "!clearkey", type: "prefix", vi: { d: "Xoá sạch toàn bộ API key.", p: "Bot owner" }, en: { d: "Clear all API keys.", p: "Bot owner" }, owner: true },
      { name: "!random", type: "prefix", vi: { d: "Chọn ngẫu nhiên một API key khả dụng.", p: "Bot owner" }, en: { d: "Pick a random available API key.", p: "Bot owner" }, owner: true },
      { name: "!changeapi", type: "prefix", vi: { d: "Đổi nhà cung cấp API.", p: "Bot owner" }, en: { d: "Change the API provider.", p: "Bot owner" }, owner: true },
      { name: "!sync", type: "prefix", vi: { d: "Đồng bộ slash command với Discord.", p: "Bot owner" }, en: { d: "Sync slash commands with Discord.", p: "Bot owner" }, owner: true }
    ]
  }
];

/* ============================================================
   HELP MENU CATEGORIES (for the in-Discord preview)
   ============================================================ */
const HELP_CATEGORIES = [
  {
    id: "ai",
    icon: "🤖",
    vi: { name: "AI Chatbot", desc: "Chat với AI (Qwen) ngay trong kênh" },
    en: { name: "AI Chatbot", desc: "Chat with AI (Qwen) right in the channel" },
    viBody: {
      title: "AI Chatbot",
      text: "Chat với AI trực tiếp trong Discord, kèm lịch sử hội thoại riêng cho từng người dùng, tạo ảnh AI và persona tuỳ chỉnh.",
      cmds: ["!chat <message>", "/chat", "!image <prompt>", "/image", "!setai", "/setai", "!clearchat", "/clearchat", "!persona <code>", "!mypersona", "!resetpersona", "!setsharedhistory", "/setsharedhistory", "!language <vi|en>", "/language"],
      note: "Mô hình công khai: Qwen3.7-max. Cocolink là nhà cung cấp ảnh chính, Gemini dùng làm dự phòng."
    },
    enBody: {
      title: "AI Chatbot",
      text: "Chat with AI directly inside Discord, with personal conversation history, AI image generation and custom personas.",
      cmds: ["!chat <message>", "/chat", "!image <prompt>", "/image", "!setai", "/setai", "!clearchat", "/clearchat", "!persona <code>", "!mypersona", "!resetpersona", "!setsharedhistory", "/setsharedhistory", "!language <vi|en>", "/language"],
      note: "Public model: Qwen3.7-max. Cocolink is the primary image provider, Gemini is the fallback."
    }
  },
  {
    id: "war",
    icon: "⚔️",
    vi: { name: "War Ping / Backup Ping", desc: "Gọi người vào war hoặc gọi backup" },
    en: { name: "War Ping / Backup Ping", desc: "Call people into a war or call for backup" },
    viBody: {
      title: "War Ping / Backup Ping",
      text: "Tạo yêu cầu War hoặc Backup, thu thập thông tin cần thiết và mở thread điều phối với các nút hành động.",
      cmds: ["WAR", "BACKUP", "WIN", "LOSE", "END", "/end all", "/trust add", "/trust remove", "/trust list", "/helppanel", "/callhacker show", "/callhacker hide"],
      note: "Vai trò cấu hình: War Ping Role, Backup Ping Role, Joined War Role, Joined Backup Role, Hacker Role."
    },
    enBody: {
      title: "War Ping / Backup Ping",
      text: "Create a War or Backup request, collect the required information and open a coordination thread with action buttons.",
      cmds: ["WAR", "BACKUP", "WIN", "LOSE", "END", "/end all", "/trust add", "/trust remove", "/trust list", "/helppanel", "/callhacker show", "/callhacker hide"],
      note: "Configurable roles: War Ping Role, Backup Ping Role, Joined War Role, Joined Backup Role, Hacker Role."
    }
  },
  {
    id: "event",
    icon: "🏆",
    vi: { name: "Event", desc: "Tạo sự kiện" },
    en: { name: "Event", desc: "Create events" },
    viBody: {
      title: "Tạo event",
      text: "Gửi sự kiện, quản lý người tham gia và blacklist sự kiện.",
      cmds: ["/event send", "/event test", "/event participants", "/event count", "/event remove", "/event clear", "/event blacklist add", "/event blacklist remove", "/event blacklist list"],
      note: "Cần quyền Manage Events để gửi và quản lý sự kiện."
    },
    enBody: {
      title: "Create events",
      text: "Send events, manage participants and the event blacklist.",
      cmds: ["/event send", "/event test", "/event participants", "/event count", "/event remove", "/event clear", "/event blacklist add", "/event blacklist remove", "/event blacklist list"],
      note: "Manage Events permission is required to send and manage events."
    }
  },
  {
    id: "banzone",
    icon: "⚠️",
    vi: { name: "Ban Channel", desc: "Kênh auto-ban, whitelist người được miễn ban" },
    en: { name: "Ban Channel", desc: "Auto-ban channel, whitelist users exempt from ban" },
    viBody: {
      title: "Ban Zone",
      text: "Hệ thống bảo vệ server: khi kênh bị xâm phạm, Nova xử lý người vi phạm theo chế độ đã cấu hình.",
      cmds: ["/banzone mode:ban", "/banzone mode:mute duration:10m", "/setbanchannel true|false", "/banwhitelist add @user", "/banwhitelist remove @user", "/banwhitelist list", "/bandebug @user"],
      note: "Whitelist theo từng server và chỉ chủ server quản lý được. Thứ bậc vai trò của bot rất quan trọng."
    },
    enBody: {
      title: "Ban Zone",
      text: "A server protection system: when a channel is compromised, Nova processes offenders according to the configured mode.",
      cmds: ["/banzone mode:ban", "/banzone mode:mute duration:10m", "/setbanchannel true|false", "/banwhitelist add @user", "/banwhitelist remove @user", "/banwhitelist list", "/bandebug @user"],
      note: "The whitelist is per-server and only the server owner can manage it. Bot role hierarchy matters."
    }
  },
  {
    id: "admin",
    icon: "🔐",
    vi: { name: "Admin", desc: "Quản lý API key cocolink, khởi động lại bot (chỉ chủ bot)" },
    en: { name: "Admin", desc: "Manage cocolink API keys, restart bot (bot owner only)" },
    viBody: {
      title: "Admin",
      text: "Nhóm lệnh quản trị chỉ chủ bot sử dụng được. Không có thông tin bí mật nào được hiển thị.",
      cmds: ["!reg", "!napkey", "!addkey", "!checkkey", "!testkey", "!delkey", "!clearkey", "!random", "!changeapi", "!sync"],
      note: "Chỉ chủ bot. Không hiển thị token, API key hay mật khẩu."
    },
    enBody: {
      title: "Admin",
      text: "Administrative commands only the bot owner can use. No secret information is displayed.",
      cmds: ["!reg", "!napkey", "!addkey", "!checkkey", "!testkey", "!delkey", "!clearkey", "!random", "!changeapi", "!sync"],
      note: "Bot owner only. Tokens, API keys and passwords are never displayed."
    }
  }
];

/* ============================================================
   !help <feature> — DETAILED FEATURE HELP
   ============================================================ */
const HELP_FEATURES = {
  chat: {
    icon: "🤖",
    vi: { title: "!chat / /chat", body: "Trò chuyện với AI trực tiếp trong Discord. Mỗi người dùng có lịch sử hội thoại riêng.", cmds: ["!chat <message>", "/chat"], perm: "Send Messages" },
    en: { title: "!chat / /chat", body: "Chat with the AI directly inside Discord. Each user keeps their own conversation history.", cmds: ["!chat <message>", "/chat"], perm: "Send Messages" }
  },
  info: {
    icon: "ℹ️",
    vi: { title: "!info / /info", body: "`!info` hoặc `/info` — Xem thông tin chung của bot, bao gồm uptime, độ trễ, AI, War/Backup, Ban Zone và chi tiết server hiện tại.", cmds: ["!info", "/info"], perm: "Send Messages" },
    en: { title: "!info / /info", body: "`!info` or `/info` — View general bot information, including uptime, latency, AI, War/Backup, Ban Zone and current-server details.", cmds: ["!info", "/info"], perm: "Send Messages" }
  },
  ban: {
    icon: "🔨",
    vi: { title: "/ban", body: "Ban thành viên được chọn khỏi server. Bot cần quyền Ban Members và vai trò cao hơn mục tiêu.", cmds: ["/ban"], perm: "Ban Members" },
    en: { title: "/ban", body: "Ban the selected member from the server. The bot needs Ban Members and a higher role than the target.", cmds: ["/ban"], perm: "Ban Members" }
  },
  mute: {
    icon: "🔇",
    vi: { title: "/mute", body: "Timeout thành viên. Thời lượng tối đa 28 ngày. Ví dụ: 10m, 2h, 7d.", cmds: ["/mute"], perm: "Moderate Members" },
    en: { title: "/mute", body: "Timeout a member. Maximum duration is 28 days. Examples: 10m, 2h, 7d.", cmds: ["/mute"], perm: "Moderate Members" }
  },
  warping: {
    icon: "⚔️",
    vi: { title: "War Ping / Backup Ping", body: "Tạo yêu cầu War hoặc Backup, mở thread điều phối và dùng các nút WAR/BACKUP/WIN/LOSE/END.", cmds: ["WAR", "BACKUP", "WIN", "LOSE", "END", "/end all"], perm: "Manage Threads" },
    en: { title: "War Ping / Backup Ping", body: "Create a War or Backup request, open a coordination thread and use the WAR/BACKUP/WIN/LOSE/END buttons.", cmds: ["WAR", "BACKUP", "WIN", "LOSE", "END", "/end all"], perm: "Manage Threads" }
  },
  image: {
    icon: "🎨",
    vi: { title: "!image / /image", body: "Tạo ảnh AI từ mô tả văn bản. Cocolink là nhà cung cấp chính, Gemini dùng làm dự phòng.", cmds: ["!image <prompt>", "/image"], perm: "Send Messages, Attach Files" },
    en: { title: "!image / /image", body: "Generate an AI image from a text prompt. Cocolink is the primary provider, Gemini is the fallback.", cmds: ["!image <prompt>", "/image"], perm: "Send Messages, Attach Files" }
  },
  event: {
    icon: "🏆",
    vi: { title: "/event", body: "Gửi sự kiện, xem người tham gia, đếm, xoá và quản lý blacklist sự kiện.", cmds: ["/event send", "/event participants", "/event count", "/event blacklist list"], perm: "Manage Events" },
    en: { title: "/event", body: "Send events, view participants, count, remove and manage the event blacklist.", cmds: ["/event send", "/event participants", "/event count", "/event blacklist list"], perm: "Manage Events" }
  },
  banzone: {
    icon: "⚠️",
    vi: { title: "Ban Zone", body: "Hệ thống bảo vệ server. Whitelist theo từng server, chỉ chủ server quản lý được.", cmds: ["/banzone", "/setbanchannel", "/banwhitelist", "/bandebug"], perm: "Manage Channels / Server Owner" },
    en: { title: "Ban Zone", body: "Server protection system. The whitelist is per-server and only the server owner can manage it.", cmds: ["/banzone", "/setbanchannel", "/banwhitelist", "/bandebug"], perm: "Manage Channels / Server Owner" }
  },
  persona: {
    icon: "🎭",
    vi: { title: "Persona", body: "Đổi phong cách trả lời của AI theo mã có sẵn hoặc mô tả tự do.", cmds: ["!persona <code>", "!persona custom: <description>", "!mypersona", "!resetpersona"], perm: "Send Messages" },
    en: { title: "Persona", body: "Change the AI reply style using a built-in code or a free-form description.", cmds: ["!persona <code>", "!persona custom: <description>", "!mypersona", "!resetpersona"], perm: "Send Messages" }
  },
  config: {
    icon: "⚙️",
    vi: { title: "/config", body: "Cấu hình kênh và vai trò cho hệ thống War/Backup và Help.", cmds: ["/config view", "/config help_channel", "/config war_ping_role", "/config backup_ping_role"], perm: "Manage Server / Manage Roles" },
    en: { title: "/config", body: "Configure channels and roles for the War/Backup and Help systems.", cmds: ["/config view", "/config help_channel", "/config war_ping_role", "/config backup_ping_role"], perm: "Manage Server / Manage Roles" }
  },
  help: {
    icon: "📖",
    vi: { title: "!help / /help", body: "`!help` mở Help Menu chính theo danh mục. `!help <feature>` chỉ hiển thị hướng dẫn chi tiết của tính năng đó.", cmds: ["!help", "/help", "!help <feature>"], perm: "Send Messages" },
    en: { title: "!help / /help", body: "`!help` opens the main Categories Help Menu. `!help <feature>` shows only that feature's detailed help.", cmds: ["!help", "/help", "!help <feature>"], perm: "Send Messages" }
  },
  serverinfo: {
    icon: "📊",
    vi: { title: "/serverinfo", body: "Xem thông tin server: tên, ID, chủ sở hữu, thành viên, kênh, vai trò, boost, xác minh, tính năng, icon/banner.", cmds: ["/serverinfo"], perm: "Send Messages" },
    en: { title: "/serverinfo", body: "View server information: name, ID, owner, members, channels, roles, boosts, verification, features, icon/banner.", cmds: ["/serverinfo"], perm: "Send Messages" }
  },
  userinfo: {
    icon: "👤",
    vi: { title: "/userinfo", body: "Xem thông tin người dùng: tài khoản, tham gia server, vai trò, trạng thái, nền tảng, hoạt động, biệt danh, boost, timeout.", cmds: ["/userinfo"], perm: "Send Messages" },
    en: { title: "/userinfo", body: "View user information: account, server join, roles, status, platform, activity, nickname, boost, timeout.", cmds: ["/userinfo"], perm: "Send Messages" }
  }
};

/* ============================================================
   LEGAL CONTENT
   ============================================================ */
const LEGAL = {
  privacy: {
    vi: `
      <h2>1. Giới thiệu</h2>
      <p>Chính sách bảo mật này giải thích cách <strong>Nova</strong> ("bot", "chúng tôi") xử lý dữ liệu khi bạn sử dụng bot trong server Discord của bạn. Chủ sở hữu bot là <strong>nova_.inovation</strong>. Ngày hiệu lực: <strong>19/09/2026</strong>.</p>

      <h2>2. Dữ liệu Nova có thể xử lý</h2>
      <p>Nova chỉ xử lý những dữ liệu tối thiểu cần thiết để vận hành các tính năng. Cụ thể:</p>
      <ul>
        <li><strong>ID người dùng Discord và ID server</strong> — dùng để phân biệt người dùng, lưu cấu hình theo từng server và áp dụng đúng quyền.</li>
        <li><strong>Nội dung tin nhắn</strong> — chỉ được xử lý khi cần thiết cho tính năng AI/chat, ví dụ khi bạn dùng <code>!chat</code>, <code>/chat</code> hoặc trong AI Channel.</li>
        <li><strong>Lịch sử hội thoại AI</strong> — dùng để duy trì ngữ cảnh trò chuyện. Mỗi người dùng có lịch sử riêng; kênh có thể dùng chung lịch sử nếu bật shared history.</li>
        <li><strong>Dữ liệu kiểm duyệt, sự kiện, War/Backup</strong> — ví dụ người tham gia sự kiện, phiên War/Backup đang hoạt động, danh sách tin cậy.</li>
        <li><strong>Dữ liệu cấu hình</strong> — kênh help, vai trò War/Backup, kênh Ban Zone, whitelist Ban Zone và các thiết lập khác.</li>
        <li><strong>Cài đặt theo phạm vi server</strong> — mọi cấu hình được lưu riêng cho từng server và không ảnh hưởng lẫn nhau.</li>
      </ul>

      <h2>3. Xử lý bởi nhà cung cấp AI</h2>
      <p>Khi bạn sử dụng tính năng AI, nội dung bạn gửi có thể được chuyển tới nhà cung cấp mô hình AI để tạo phản hồi. Mô hình công khai được hiển thị trên trang web này là <strong>Qwen3.7-max</strong>. Với tính năng tạo ảnh, <strong>Cocolink</strong> là nhà cung cấp chính và <strong>Gemini</strong> được dùng làm phương án dự phòng khi cần thiết.</p>
      <p>Chúng tôi không kiểm soát chính sách riêng của các nhà cung cấp bên thứ ba. Bạn nên tránh gửi thông tin nhạy cảm (mật khẩu, thông tin thanh toán, giấy tờ tuỳ thân) vào các lệnh AI.</p>

      <h2>4. Nguyên tắc lưu trữ dữ liệu</h2>
      <ul>
        <li>Dữ liệu được lưu ở mức tối thiểu cần thiết cho tính năng tương ứng.</li>
        <li>Lịch sử hội thoại AI có thể được xoá bởi người dùng bằng <code>!clearchat</code> hoặc <code>/clearchat</code>.</li>
        <li>Dữ liệu cấu hình server tồn tại chừng nào bot còn trong server và cấu hình chưa bị xoá.</li>
        <li>Khi bot bị mời ra khỏi server, dữ liệu cấu hình gắn với server đó có thể được xoá hoặc giữ lại trong thời gian hợp lý để tránh lỗi khi bot được mời lại.</li>
      </ul>

      <h2>5. Nguyên tắc bảo mật</h2>
      <p>Chúng tôi áp dụng các nguyên tắc hợp lý để bảo vệ dữ liệu: giới hạn quyền truy cập, không hiển thị thông tin bí mật ra bên ngoài, và không lưu trữ token, API key hay mật khẩu trên trang web tĩnh này. Tuy nhiên, không có hệ thống nào an toàn tuyệt đối — chúng tôi không thể đảm bảo an toàn tuyệt đối cho mọi dữ liệu.</p>

      <h2>6. Quyền của bạn</h2>
      <ul>
        <li>Bạn có thể yêu cầu xem, sửa hoặc xoá dữ liệu liên quan tới mình.</li>
        <li>Bạn có thể xoá lịch sử hội thoại AI của mình bằng lệnh <code>!clearchat</code>.</li>
        <li>Chủ server có thể xoá cấu hình bằng các lệnh cấu hình tương ứng.</li>
        <li>Bạn có thể liên hệ qua email hoặc Support Server để yêu cầu hỗ trợ.</li>
      </ul>

      <h2>7. Liên hệ</h2>
      <p>Email: <a href="mailto:anhbao27072011@gmail.com">anhbao27072011@gmail.com</a><br>
      Support Server: <a href="https://discord.gg/qkyu3G6WMa" target="_blank" rel="noopener">discord.gg/qkyu3G6WMa</a><br>
      Chủ sở hữu: <strong>nova_.inovation</strong></p>
    `,
    en: `
      <h2>1. Introduction</h2>
      <p>This Privacy Policy explains how <strong>Nova</strong> ("the bot", "we") processes data when you use the bot in your Discord server. The bot is owned by <strong>nova_.inovation</strong>. Effective date: <strong>19/09/2026</strong>.</p>

      <h2>2. Data Nova may process</h2>
      <p>Nova only processes the minimum data required to operate its features:</p>
      <ul>
        <li><strong>Discord user IDs and server IDs</strong> — used to distinguish users, store per-server configuration and apply the correct permissions.</li>
        <li><strong>Message content</strong> — processed only where required for AI/chat features, e.g. when you use <code>!chat</code>, <code>/chat</code> or inside an AI Channel.</li>
        <li><strong>AI conversation history</strong> — used to maintain conversation context. Each user has their own history; a channel can share history when shared history is enabled.</li>
        <li><strong>Moderation, event, War/Backup data</strong> — e.g. event participants, active War/Backup sessions, trusted user lists.</li>
        <li><strong>Configuration data</strong> — help channel, War/Backup roles, Ban Zone channel, Ban Zone whitelist and other settings.</li>
        <li><strong>Server-scoped settings</strong> — all configuration is stored per server and does not affect other servers.</li>
      </ul>

      <h2>3. AI provider processing</h2>
      <p>When you use AI features, the content you submit may be sent to an AI model provider to generate a response. The public model displayed on this website is <strong>Qwen3.7-max</strong>. For image generation, <strong>Cocolink</strong> is the primary provider and <strong>Gemini</strong> is used as a fallback when necessary.</p>
      <p>We do not control the independent policies of third-party providers. You should avoid sending sensitive information (passwords, payment details, identity documents) into AI commands.</p>

      <h2>4. Data retention principles</h2>
      <ul>
        <li>Data is stored only at the minimum level required for the corresponding feature.</li>
        <li>AI conversation history can be cleared by the user with <code>!clearchat</code> or <code>/clearchat</code>.</li>
        <li>Server configuration data exists as long as the bot remains in the server and the configuration has not been cleared.</li>
        <li>When the bot is removed from a server, configuration tied to that server may be deleted or retained for a reasonable period to avoid errors if the bot is re-invited.</li>
      </ul>

      <h2>5. Security principles</h2>
      <p>We apply reasonable principles to protect data: limiting access, never exposing secrets externally, and never storing tokens, API keys or passwords on this static website. However, no system is perfectly secure — we cannot guarantee absolute security for all data.</p>

      <h2>6. Your rights</h2>
      <ul>
        <li>You may request to view, correct or delete data related to you.</li>
        <li>You can clear your own AI conversation history with <code>!clearchat</code>.</li>
        <li>Server owners can clear configuration using the relevant configuration commands.</li>
        <li>You can contact us by email or through the Support Server for assistance.</li>
      </ul>

      <h2>7. Contact</h2>
      <p>Email: <a href="mailto:anhbao27072011@gmail.com">anhbao27072011@gmail.com</a><br>
      Support Server: <a href="https://discord.gg/qkyu3G6WMa" target="_blank" rel="noopener">discord.gg/qkyu3G6WMa</a><br>
      Owner: <strong>nova_.inovation</strong></p>
    `
  },
  terms: {
    vi: `
      <h2>1. Mô tả dịch vụ</h2>
      <p><strong>Nova</strong> là bot Discord cung cấp các tính năng: AI chat, tạo ảnh AI, điều phối War/Backup, tạo sự kiện, bảo vệ Ban Zone, kiểm duyệt và quản lý server. Bot được phát triển và duy trì bởi <strong>nova_.inovation</strong>. Ngày hiệu lực: <strong>19/09/2026</strong>.</p>

      <h2>2. Sử dụng hợp lệ</h2>
      <ul>
        <li>Bạn phải tuân thủ Điều khoản dịch vụ và Nguyên tắc cộng đồng của Discord.</li>
        <li>Bạn phải có đủ quyền hạn trong server khi sử dụng các lệnh kiểm duyệt, cấu hình hoặc Ban Zone.</li>
        <li>Bạn chịu trách nhiệm về nội dung mình gửi vào các lệnh AI.</li>
        <li>Bạn không được lợi dụng bot để quấy rối, doxxing, spam hoặc phát tán nội dung vi phạm pháp luật.</li>
      </ul>

      <h2>3. Hành vi bị cấm</h2>
      <ul>
        <li>Cố gắng khai thác, phá hoại hoặc gây quá tải hệ thống bot.</li>
        <li>Cố gắng truy cập trái phép vào API key, token hoặc cấu hình nội bộ.</li>
        <li>Sử dụng bot để thực hiện hành vi vi phạm pháp luật hoặc xâm phạm quyền của người khác.</li>
        <li>Dùng tính năng Ban Zone để trục lợi hoặc trả đũa không chính đáng.</li>
      </ul>

      <h2>4. Trách nhiệm kiểm duyệt</h2>
      <p>Bạn và ban quản trị server chịu trách nhiệm về cách sử dụng các lệnh kiểm duyệt và Ban Zone. Nova chỉ thực thi theo cấu hình và quyền hạn bạn thiết lập. Thứ bậc vai trò của bot so với mục tiêu là yếu tố quyết định khả năng hành động, và chủ server không thể bị bot ban.</p>

      <h2>5. Tuyên bố miễn trừ về nội dung do AI tạo</h2>
      <p>Nội dung do AI tạo (văn bản và hình ảnh) có thể không chính xác, không đầy đủ hoặc không phù hợp với mục đích cụ thể của bạn. Bạn tự chịu trách nhiệm khi sử dụng nội dung đó. Nova không đảm bảo tính chính xác của nội dung AI.</p>

      <h2>6. Sử dụng tính năng War/Backup/Event</h2>
      <p>Các tính năng War/Backup/Event được cung cấp để hỗ trợ điều phối trong server. Bạn chịu trách nhiệm về thông tin mình cung cấp và về việc sử dụng các nút hành động đúng mục đích. Nova không chịu trách nhiệm cho các thoả thuận hoặc kết quả giữa các thành viên bên ngoài bot.</p>

      <h2>7. Trách nhiệm về Ban Zone</h2>
      <p>Ban Zone là công cụ bảo vệ server. Bạn chịu trách nhiệm cấu hình đúng chế độ, whitelist và vai trò. Việc whitelist chỉ chủ server quản lý được nhằm hạn chế lạm dụng. Nova không chịu trách nhiệm cho hậu quả phát sinh từ cấu hình sai.</p>

      <h2>8. Tuyên bố miễn trừ về tính khả dụng</h2>
      <p>Dịch vụ được cung cấp "nguyên trạng". Nova có thể tạm ngừng, thay đổi hoặc ngừng hoạt động bất kỳ lúc nào mà không cần báo trước. Chúng tôi không đảm bảo bot luôn trực tuyến, không lỗi hoặc không bị gián đoạn.</p>

      <h2>9. Thay đổi dịch vụ</h2>
      <p>Chúng tôi có thể cập nhật các tính năng, lệnh hoặc điều khoản này. Phiên bản mới sẽ được áp dụng kể từ ngày hiệu lực ghi trên trang. Việc tiếp tục sử dụng bot sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các thay đổi đó.</p>

      <h2>10. Tạm ngừng hoặc chấm dứt</h2>
      <p>Chúng tôi có thể tạm ngừng hoặc chấm dứt quyền truy cập của bạn vào bot nếu bạn vi phạm các điều khoản này hoặc có hành vi gây hại. Chủ server có thể gỡ bot khỏi server bất kỳ lúc nào.</p>

      <h2>11. Liên hệ</h2>
      <p>Chủ sở hữu: <strong>nova_.inovation</strong><br>
      Email: <a href="mailto:anhbao27072011@gmail.com">anhbao27072011@gmail.com</a><br>
      Support Server: <a href="https://discord.gg/qkyu3G6WMa" target="_blank" rel="noopener">discord.gg/qkyu3G6WMa</a></p>
    `,
    en: `
      <h2>1. Service description</h2>
      <p><strong>Nova</strong> is a Discord bot providing AI chat, AI image generation, War/Backup coordination, event creation, Ban Zone protection, moderation and server management. The bot is developed and maintained by <strong>nova_.inovation</strong>. Effective date: <strong>19/09/2026</strong>.</p>

      <h2>2. Acceptable use</h2>
      <ul>
        <li>You must comply with Discord's Terms of Service and Community Guidelines.</li>
        <li>You must hold sufficient permissions in the server when using moderation, configuration or Ban Zone commands.</li>
        <li>You are responsible for the content you submit into AI commands.</li>
        <li>You may not use the bot for harassment, doxxing, spam or distributing illegal content.</li>
      </ul>

      <h2>3. Prohibited abuse</h2>
      <ul>
        <li>Attempting to exploit, disrupt or overload the bot's systems.</li>
        <li>Attempting unauthorised access to API keys, tokens or internal configuration.</li>
        <li>Using the bot to commit illegal acts or infringe on the rights of others.</li>
        <li>Using the Ban Zone feature for unjustified retaliation or gain.</li>
      </ul>

      <h2>4. Moderation responsibilities</h2>
      <p>You and your server's staff are responsible for how moderation and Ban Zone commands are used. Nova only executes according to the configuration and permissions you set. The bot's role hierarchy relative to the target determines whether it can act, and the server owner can never be banned by the bot.</p>

      <h2>5. AI-generated content disclaimer</h2>
      <p>AI-generated content (text and images) may be inaccurate, incomplete or unsuitable for your specific purpose. You use such content at your own responsibility. Nova does not guarantee the accuracy of AI content.</p>

      <h2>6. War/Backup/Event feature usage</h2>
      <p>War/Backup/Event features are provided to support in-server coordination. You are responsible for the information you provide and for using the action buttons appropriately. Nova is not responsible for agreements or outcomes between members outside the bot.</p>

      <h2>7. Ban Zone responsibility</h2>
      <p>Ban Zone is a server protection tool. You are responsible for configuring the correct mode, whitelist and roles. The whitelist being manageable only by the server owner exists to limit abuse. Nova is not responsible for consequences arising from incorrect configuration.</p>

      <h2>8. Availability disclaimer</h2>
      <p>The service is provided "as is". Nova may be paused, changed or discontinued at any time without prior notice. We do not guarantee that the bot will always be online, error-free or uninterrupted.</p>

      <h2>9. Changes to the service</h2>
      <p>We may update features, commands or these terms. The new version applies from the effective date shown on this page. Continuing to use the bot after changes means you accept those changes.</p>

      <h2>10. Termination or suspension</h2>
      <p>We may suspend or terminate your access to the bot if you violate these terms or engage in harmful behaviour. Server owners may remove the bot from their server at any time.</p>

      <h2>11. Contact</h2>
      <p>Owner: <strong>nova_.inovation</strong><br>
      Email: <a href="mailto:anhbao27072011@gmail.com">anhbao27072011@gmail.com</a><br>
      Support Server: <a href="https://discord.gg/qkyu3G6WMa" target="_blank" rel="noopener">discord.gg/qkyu3G6WMa</a></p>
    `
  }
};

/* ============================================================
   STATE
   ============================================================ */
let lang = 'vi';
let activeCategory = 'all';
let lastFocused = null;

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   HELPERS
   ============================================================ */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const t  = (key) => (I18N[lang] && I18N[lang][key]) || (I18N.vi[key] || key);
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function typeLabel(type) {
  const map = {
    slash: 'commands.type.slash',
    prefix: 'commands.type.prefix',
    both: 'commands.type.both',
    button: 'commands.type.button'
  };
  return t(map[type] || 'commands.type.slash');
}
function typeClass(type) {
  if (type === 'slash') return 'slash';
  if (type === 'prefix') return 'prefix';
  if (type === 'button') return 'both';
  return 'both';
}

/* ============================================================
   LANGUAGE
   ============================================================ */
function setLang(next, save = true) {
  lang = (next === 'en') ? 'en' : 'vi';
  document.documentElement.lang = lang;
  if (save) { try { localStorage.setItem('nova-lang', lang); } catch (e) {} }

  // Static text nodes
  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = I18N[lang][key];
    if (typeof val === 'string') el.innerHTML = val;
  });
  // Placeholders
  $$('[data-i18n-placeholder]').forEach(el => {
    const val = I18N[lang][el.getAttribute('data-i18n-placeholder')];
    if (val) el.setAttribute('placeholder', val);
  });
  // HTML blocks (legal)
  $$('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    const src = key.startsWith('privacy') ? LEGAL.privacy : LEGAL.terms;
    el.innerHTML = src[lang];
  });
  // aria
  $$('[data-i18n-aria]').forEach(el => {
    const val = I18N[lang][el.getAttribute('data-i18n-aria')];
    if (val) el.setAttribute('aria-label', val);
  });

  // Segmented control state
  const seg = $('#langSwitch');
  if (seg) {
    seg.setAttribute('data-active', lang);
    $$('.seg-btn', seg).forEach(b => {
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });
  }

  // Re-render dynamic sections
  renderFeatures();
  renderChips();
  renderCommands();
  renderHelpCategories();
  renderHelpSelect();
  renderHelpChips();
  if (lastHelpFeature) renderHelpFeature(lastHelpFeature);
  applySearch();

  // Title
  const page = document.body.dataset.page;
  if (page === 'privacy') document.title = (lang === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy') + ' — Nova';
  else if (page === 'terms') document.title = (lang === 'vi' ? 'Điều khoản dịch vụ' : 'Terms of Service') + ' — Nova';
  else document.title = t('meta.title');
}

/* ============================================================
   FEATURES
   ============================================================ */
function renderFeatures() {
  const grid = $('#featureGrid');
  if (!grid) return;
  grid.innerHTML = FEATURES.map(f => {
    const loc = f[lang];
    return `
      <article class="feature-card reveal" tabindex="0" role="button"
               aria-label="${esc(loc.title)}"
               data-feature="${f.id}">
        <div class="feature-icon" aria-hidden="true">${f.icon}</div>
        <h3>${esc(loc.title)}</h3>
        <p>${esc(loc.short)}</p>
        <div class="feature-meta">
          <span>${f.commands.length} ${esc(t('features.commands'))}</span>
          <span class="open">${esc(t('features.view'))}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
        </div>
      </article>`;
  }).join('');

  $$('.feature-card', grid).forEach(card => {
    card.addEventListener('click', () => openFeature(card.dataset.feature));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFeature(card.dataset.feature); }
    });
    // specular highlight
    card.addEventListener('pointermove', e => {
      if (REDUCED) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  observeReveal();
}

function openFeature(id) {
  const f = FEATURES.find(x => x.id === id);
  if (!f) return;
  const loc = f[lang];
  const body = $('#modalBody');
  const titleId = 'modalTitle';

  const cmdsHtml = f.commands.map(c => `
    <div class="modal-cmd">
      <div class="mc-top">
        <span class="cmd-name">${esc(c.name)}</span>
        <span class="tag ${typeClass(c.type)}">${esc(typeLabel(c.type))}</span>
        ${c.owner ? `<span class="tag owner">${esc(t('commands.ownerOnly'))}</span>` : ''}
      </div>
      <p class="mc-desc">${esc(c[lang].d)}</p>
      ${c[lang].p ? `<p class="mc-perm"><b>${esc(t('commands.permission'))}:</b> ${esc(c[lang].p)}</p>` : ''}
      ${c.ex ? `<code class="modal-example">${esc(c.ex)}</code>` : ''}
    </div>`).join('');

  const detailsHtml = loc.details.map(d => `<li>${d}</li>`).join('');
  const permsHtml = loc.perms.map(p => `<li>${p}</li>`).join('');
  const examplesHtml = loc.examples.map(e => `<code class="modal-example">${esc(e)}</code>`).join('');

  body.innerHTML = `
    <div class="modal-head">
      <div class="m-icon" aria-hidden="true">${f.icon}</div>
      <h2 id="${titleId}">${esc(loc.title)}</h2>
    </div>
    <p class="modal-lead">${esc(loc.lead)}</p>

    <div class="modal-section">
      <h3>${esc(t('modal.featuresTitle'))}</h3>
      <ul class="modal-list">${detailsHtml}</ul>
    </div>

    <div class="modal-section">
      <h3>${esc(t('modal.commandsTitle'))}</h3>
      <div class="modal-cmds">${cmdsHtml}</div>
    </div>

    <div class="modal-section">
      <h3>${esc(t('modal.permsTitle'))}</h3>
      <ul class="modal-list">${permsHtml}</ul>
    </div>

    <div class="modal-section">
      <h3>${esc(t('modal.examplesTitle'))}</h3>
      ${examplesHtml}
    </div>

    <div class="modal-actions">
      <a class="btn btn-primary" href="${CONFIG.BOT_INVITE_URL}" target="_blank" rel="noopener">${esc(t('modal.invite'))}</a>
      <a class="btn btn-glass" href="${CONFIG.SUPPORT_SERVER_URL}" target="_blank" rel="noopener">${esc(t('modal.support'))}</a>
    </div>`;

  showModal();
}

/* ============================================================
   MODAL
   ============================================================ */
function showModal() {
  const modal = $('#modal');
  lastFocused = document.activeElement;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  const panel = $('.modal-panel', modal);
  requestAnimationFrame(() => panel.focus());
  document.addEventListener('keydown', onModalKey);
}
function closeModal() {
  const modal = $('#modal');
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.style.overflow = '';
  document.removeEventListener('keydown', onModalKey);
  if (lastFocused && lastFocused.focus) lastFocused.focus();
}
function onModalKey(e) {
  if (e.key === 'Escape') { e.preventDefault(); closeModal(); return; }
  if (e.key !== 'Tab') return;
  const panel = $('#modal .modal-panel');
  const focusables = $$('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', panel)
    .filter(el => el.offsetParent !== null);
  if (!focusables.length) return;
  const first = focusables[0], last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

/* ============================================================
   COMMAND DIRECTORY
   ============================================================ */
function allCommands() {
  const out = [];
  FEATURES.forEach(f => f.commands.forEach(c => out.push({ ...c, featureId: f.id, icon: f.icon })));
  return out;
}

function renderChips() {
  const wrap = $('#categoryChips');
  if (!wrap) return;
  const cats = [{ id: 'all', icon: '✨', vi: { title: t('commands.all') }, en: { title: t('commands.all') } }]
    .concat(FEATURES.map(f => ({ id: f.id, icon: f.icon, vi: { title: f.vi.title }, en: { title: f.en.title } })));

  wrap.innerHTML = cats.map(c => `
    <button type="button" class="chip${activeCategory === c.id ? ' active' : ''}"
            role="tab" aria-selected="${activeCategory === c.id}"
            data-cat="${c.id}">${c.icon} ${esc(c[lang].title)}</button>`).join('');

  $$('.chip', wrap).forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      renderChips();
      renderCommands();
      applySearch();
    });
  });
}

function renderCommands() {
  const wrap = $('#commandGroups');
  if (!wrap) return;
  const groups = activeCategory === 'all'
    ? FEATURES
    : FEATURES.filter(f => f.id === activeCategory);

  wrap.innerHTML = groups.map(f => {
    const loc = f[lang];
    return `
      <div class="cmd-group" data-group="${f.id}">
        <div class="cmd-group-head">
          <span class="g-icon" aria-hidden="true">${f.icon}</span>
          <h3>${esc(loc.title)}</h3>
          <span class="count">${f.commands.length} ${esc(t('features.commands'))}</span>
        </div>
        <div class="cmd-list">
          ${f.commands.map(c => cmdCard(c, lang)).join('')}
        </div>
      </div>`;
  }).join('');

  observeReveal();
}

function cmdCard(c, L) {
  return `
    <article class="cmd-card reveal">
      <div class="cmd-top">
        <span class="cmd-name">${esc(c.name)}</span>
        <span class="tag ${typeClass(c.type)}">${esc(typeLabel(c.type))}</span>
        ${c.owner ? `<span class="tag owner">${esc(t('commands.ownerOnly'))}</span>` : ''}
      </div>
      <p class="cmd-desc">${esc(c[L].d)}</p>
      <div class="cmd-foot">
        ${c[L].p ? `<span><b>${esc(t('commands.permission'))}:</b> ${esc(c[L].p)}</span>` : ''}
      </div>
      ${c.ex ? `<code class="cmd-example">${esc(c.ex)}</code>` : ''}
    </article>`;
}

/* ============================================================
   SEARCH
   ============================================================ */
function applySearch() {
  const input = $('#searchInput');
  const clear = $('#searchClear');
  const results = $('#searchResults');
  const groups = $('#commandGroups');
  if (!input || !results || !groups) return;

  const q = input.value.trim().toLowerCase();
  clear.hidden = !q;

  if (!q) {
    results.hidden = true;
    results.innerHTML = '';
    groups.hidden = false;
    return;
  }

  groups.hidden = true;
  results.hidden = false;

  // Search commands
  const cmdHits = allCommands().filter(c => {
    const hay = [c.name, c[lang].d, c[lang].p, c.ex, c.featureId].join(' ').toLowerCase();
    return hay.includes(q);
  });

  // Search features
  const featHits = FEATURES.filter(f => {
    const hay = [f[lang].title, f[lang].short, f[lang].lead,
                 (f[lang].details || []).join(' '),
                 (f[lang].perms || []).join(' ')].join(' ').toLowerCase();
    return hay.includes(q);
  });

  // Search help categories
  const helpHits = HELP_CATEGORIES.filter(h => {
    const hay = [h[lang].name, h[lang].desc, h.viBody.title, h.enBody.title].join(' ').toLowerCase();
    return hay.includes(q);
  });

  if (!cmdHits.length && !featHits.length && !helpHits.length) {
    results.innerHTML = `<div class="sr-empty">${esc(t('commands.noResults'))}</div>`;
    return;
  }

  let html = '';

  if (featHits.length) {
    html += `<div class="cmd-group">
      <div class="cmd-group-head">
        <span class="g-icon">🧩</span>
        <h3>${esc(t('nav.features'))}</h3>
        <span class="count">${featHits.length} ${esc(t('commands.results'))}</span>
      </div>
      <div class="cmd-list">
        ${featHits.map(f => `
          <article class="cmd-card" data-jump="${f.id}" tabindex="0" role="button">
            <div class="cmd-top">
              <span class="cmd-name">${f.icon} ${esc(f[lang].title)}</span>
            </div>
            <p class="cmd-desc">${esc(f[lang].short)}</p>
            <div class="cmd-foot"><span><b>${esc(t('features.view'))}</b></span></div>
          </article>`).join('')}
      </div>
    </div>`;
  }

  if (cmdHits.length) {
    html += `<div class="cmd-group">
      <div class="cmd-group-head">
        <span class="g-icon">⌨️</span>
        <h3>${esc(t('nav.commands'))}</h3>
        <span class="count">${cmdHits.length} ${esc(t('commands.results'))}</span>
      </div>
      <div class="cmd-list">
        ${cmdHits.map(c => cmdCard(c, lang)).join('')}
      </div>
    </div>`;
  }

  if (helpHits.length) {
    html += `<div class="cmd-group">
      <div class="cmd-group-head">
        <span class="g-icon">📖</span>
        <h3>${esc(t('nav.help'))}</h3>
        <span class="count">${helpHits.length} ${esc(t('commands.results'))}</span>
      </div>
      <div class="cmd-list">
        ${helpHits.map(h => `
          <article class="cmd-card" data-help="${h.id}" tabindex="0" role="button">
            <div class="cmd-top">
              <span class="cmd-name">${h.icon} ${esc(h[lang].name)}</span>
            </div>
            <p class="cmd-desc">${esc(h[lang].desc)}</p>
          </article>`).join('')}
      </div>
    </div>`;
  }

  results.innerHTML = html;

  $$('[data-jump]', results).forEach(el => {
    const go = () => { closeModal(); location.hash = '#features'; openFeature(el.dataset.jump); };
    el.addEventListener('click', go);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  });
  $$('[data-help]', results).forEach(el => {
    el.addEventListener('click', () => {
      closeModal();
      const sel = $('#helpSelect');
      if (sel) { sel.value = el.dataset.help; sel.dispatchEvent(new Event('change')); }
      location.hash = '#help';
    });
  });
}

/* ============================================================
   HELP MENU PREVIEW
   ============================================================ */
function renderHelpCategories() {
  const list = $('#helpCategoryList');
  if (!list) return;
  list.innerHTML = HELP_CATEGORIES.map(h => `
    <li>
      <span class="ico" aria-hidden="true">${h.icon}</span>
      <span><b>${esc(h[lang].name)}</b><span>${esc(h[lang].desc)}</span></span>
    </li>`).join('');
}

function renderHelpSelect() {
  const sel = $('#helpSelect');
  if (!sel) return;
  const current = sel.value;
  sel.innerHTML = `<option value="">${esc(t('help.selectPlaceholder'))}</option>` +
    HELP_CATEGORIES.map(h => `<option value="${h.id}">${h.icon} ${esc(h[lang].name)}</option>`).join('');
  if (current) sel.value = current;
}

function renderHelpChips() {
  const wrap = $('#helpChips');
  if (!wrap) return;
  const keys = ['chat', 'info', 'ban', 'mute', 'warping', 'image', 'event', 'banzone', 'persona', 'config', 'help', 'serverinfo', 'userinfo'];
  wrap.innerHTML = keys.map(k => `<button type="button" class="chip" data-hf="${k}">!help ${esc(k)}</button>`).join('');
  $$('[data-hf]', wrap).forEach(b => {
    b.addEventListener('click', () => {
      const inp = $('#helpFeatureInput');
      if (inp) inp.value = b.dataset.hf;
      renderHelpFeature(b.dataset.hf);
    });
  });
}

function renderHelpCategory(id) {
  const out = $('#helpOutput');
  const h = HELP_CATEGORIES.find(x => x.id === id);
  if (!out) return;
  if (!h) { out.innerHTML = ''; return; }
  const body = lang === 'vi' ? h.viBody : h.enBody;
  out.innerHTML = `
    <div class="help-out-card">
      <h4>${h.icon} ${esc(body.title)}</h4>
      <div class="hc-cmds">
        ${body.cmds.map(c => `<span class="cmd-name">${esc(c)}</span>`).join('')}
      </div>
      <p>${esc(body.text)}</p>
      <p><strong>${lang === 'vi' ? 'Lưu ý' : 'Note'}:</strong> ${esc(body.note)}</p>
    </div>`;
}

let lastHelpFeature = null;

function renderHelpFeature(key) {
  const out = $('#helpFeatureOutput');
  if (!out) return;
  const k = String(key || '').trim().toLowerCase().replace(/^!?help\s*/, '');
  lastHelpFeature = k;
  const f = HELP_FEATURES[k];

  if (!f) {
    out.innerHTML = `<div class="help-out-card"><p>${esc(t('help.notFound'))}</p></div>`;
    return;
  }
  const loc = f[lang];
  out.innerHTML = `
    <div class="help-out-card">
      <h4>${f.icon} ${esc(loc.title)}</h4>
      <div class="hc-cmds">
        ${loc.cmds.map(c => `<span class="cmd-name">${esc(c)}</span>`).join('')}
      </div>
      <p>${loc.body.replace(/`([^`]+)`/g, '<code>$1</code>')}</p>
      <p><strong>${esc(t('commands.permission'))}:</strong> ${esc(loc.perm)}</p>
    </div>`;
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const btn = $('#hamburger');
  const menu = $('#mobileMenu');
  if (!btn || !menu) return;

  const close = () => { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-label', 'Open menu'); };
  const open  = () => { menu.hidden = false; btn.setAttribute('aria-expanded', 'true');  btn.setAttribute('aria-label', 'Close menu'); };

  btn.addEventListener('click', () => {
    if (menu.hidden) open(); else close();
  });
  $$('a', menu).forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) close(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 1080 && !menu.hidden) close(); });
}

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
let revealObserver = null;
function observeReveal() {
  if (REDUCED || !('IntersectionObserver' in window)) {
    $$('.reveal').forEach(el => el.classList.add('in'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          revealObserver.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });
  }
  $$('.reveal:not(.in)').forEach(el => revealObserver.observe(el));
}

/* ============================================================
   IMAGE FALLBACK
   ============================================================ */
function initImageFallback() {
  $$('img[data-avatar]').forEach(img => {
    img.addEventListener('error', () => {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = '1';
      img.src = FALLBACK_AVATAR;
    }, { once: true });
    // If already failed before JS ran
    if (img.complete && img.naturalWidth === 0) {
      img.dataset.fallbackApplied = '1';
      img.src = FALLBACK_AVATAR;
    }
  });
}

/* ============================================================
   INIT
   ============================================================ */
function init() {
  // Language: localStorage > default vi
  let saved = null;
  try { saved = localStorage.getItem('nova-lang'); } catch (e) {}
  lang = (saved === 'en' || saved === 'vi') ? saved : 'vi';

  initImageFallback();
  initMobileMenu();

  // Year
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();

  // Segmented control
  const seg = $('#langSwitch');
  if (seg) {
    $$('.seg-btn', seg).forEach(b => {
      b.addEventListener('click', () => setLang(b.dataset.lang));
    });
  }

  // Modal close
  $$('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));

  // Search
  const input = $('#searchInput');
  if (input) {
    input.addEventListener('input', applySearch);
    input.addEventListener('keydown', e => { if (e.key === 'Escape') { input.value = ''; applySearch(); } });
  }
  const clear = $('#searchClear');
  if (clear) clear.addEventListener('click', () => { if (input) input.value = ''; applySearch(); input && input.focus(); });

  // Help select
  const sel = $('#helpSelect');
  if (sel) sel.addEventListener('change', () => renderHelpCategory(sel.value));

  // Help form
  const form = $('#helpForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      renderHelpFeature($('#helpFeatureInput').value);
    });
  }

  // Smooth scroll for in-page anchors
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });

  // First render
  setLang(lang, false);

  // Default help preview: show AI Chatbot selected
  if (sel && document.body.dataset.page === 'index') {
    sel.value = 'ai';
    renderHelpCategory('ai');
  }
  // Default !help info preview
  if ($('#helpFeatureOutput') && document.body.dataset.page === 'index') {
    renderHelpFeature('info');
  }

  // Navbar shadow on scroll
  const nav = $('#nav');
  if (nav) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        nav.style.transform = window.scrollY > 12 ? 'translateY(-2px)' : '';
        ticking = false;
      });
    }, { passive: true });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
