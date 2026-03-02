export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  role: string;
  description: string;
  scope: string[];
  impact: string[];
  color: string;
}

export const projects: Project[] = [
  {
    slug: "whales-market",
    title: "Whales Market",
    subtitle: "Advanced Trading Platform cho giao dịch Pre-Market",
    year: "2025",
    tags: ["Trading", "Web App", "Mobile App"],
    role: "Product Design",
    description:
      "Advanced Trading Platform cho giao dịch Pre-Market, tập trung vào nhóm pro traders và high-frequency users.",
    scope: [
      "Định hình kiến trúc giao dịch tổng thể: orderbook, position management, portfolio, P2P matching",
      "Xây dựng logic Pre-Market settlement",
      "Mobile adaptation cho trader theo dõi và đặt lệnh nhanh",
      "Chuẩn hóa design system cho trading components",
    ],
    impact: [
      "$339M+ tổng Pre-Market Volume",
      "326K+ users đã tham gia nền tảng",
      "369+ token được settled across 26 blockchain ecosystems",
      "Xử lý multi-chain settlement complexity và matching logic trong môi trường real-time",
    ],
    color: "#4c48ff",
  },
  {
    slug: "whales-predict",
    title: "Whales Predict",
    subtitle: "Prediction Market cho trader",
    year: "2025",
    tags: ["Trading", "Prediction", "Web App"],
    role: "Product Design",
    description:
      "Prediction Market cho trader đặt cược vào outcome của token/event. Mở rộng decision layer trong ecosystem trading.",
    scope: [
      "Thiết kế cơ chế prediction ở level sản phẩm (pricing logic, risk clarity, outcome modeling)",
      "UX tối ưu decision speed cho trader trong môi trường biến động cao",
      "Cấu trúc thông tin để giảm cognitive load trong outcome-based trading",
      "Thiết kế hệ thống hiển thị probability, payout logic và risk transparency",
    ],
    impact: [
      "Sản phẩm đang ở giai đoạn Private Beta với nhóm power users",
      "Tham gia hoàn thiện kiến trúc sản phẩm trước public launch",
      "Chuẩn hóa logic prediction và cải thiện tính minh bạch về pricing & risk",
    ],
    color: "#22c55e",
  },
  {
    slug: "mention-network",
    title: "Mention Network",
    subtitle: "AI Visibility & GEO Platform",
    year: "2025",
    tags: ["AI", "Data", "SaaS"],
    role: "Product Design",
    description:
      "AI Visibility & Generative Engine Optimization (GEO) platform giúp thương hiệu theo dõi và tối ưu cách họ được đề cập trong các câu trả lời của AI.",
    scope: [
      "Thiết kế sản phẩm thu thập và cấu trúc dữ liệu AI mentions (frequency, context, sentiment)",
      "Xây dựng dashboard AI Visibility với hệ thống metric rõ ràng",
      "Cấu trúc report giúp brand hiểu cách họ xuất hiện trong AI-generated answers",
      "Tối ưu UX cho workflow phân tích dữ liệu và xuất insight",
    ],
    impact: [
      "Xây dựng framework AI Visibility Report với visibility share, brand ranking và AI model-level breakdown",
      "Chuẩn hóa cách đo lường brand presence trong AI-generated answers",
      "Giúp chuyển AI interaction data thành insight có thể hành động",
    ],
    color: "#f59e0b",
  },
  {
    slug: "geo-report",
    title: "GeoReport",
    subtitle: "AI-Friendliness Audit Tool",
    year: "2025",
    tags: ["AI", "SEO", "Tool"],
    role: "Product Design",
    description:
      "Công cụ đánh giá một website có 'AI-friendly' hay không — giúp tối ưu khả năng được index và trích dẫn bởi AI.",
    scope: [
      "Xây dựng framework đánh giá AI-friendliness ở level hệ thống (scoring logic, evaluation criteria, signal weighting)",
      "Chuẩn hóa report structure cho SEO + AI indexing",
      "UX tập trung vào clarity của insight thay vì chỉ metrics",
    ],
    impact: [
      "Framework đánh giá AI-friendliness toàn diện",
      "Chuẩn hóa báo cáo SEO + AI indexing",
      "Giúp website tối ưu khả năng được AI trích dẫn",
    ],
    color: "#ec4899",
  },
];
