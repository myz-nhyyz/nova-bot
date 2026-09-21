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
      { name: "/end all", type: "slash", vi: { d: "Kết thúc mọi phiên War/Backup đang hoạt động trong server.", p: "Manage Threads" }, en: { d: "End all active War/Backup sessions in the server.",
