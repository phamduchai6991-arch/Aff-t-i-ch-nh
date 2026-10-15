import type { FinancialProduct } from '../types/index.ts';

export const INITIAL_PRODUCTS: FinancialProduct[] = [
  // ==========================================
  // --- 1. SẢN PHẨM VAY TÍN CHẤP TIÊU DÙNG ---
  // ==========================================
  {
    id: "vpbank-fast",
    name: "Vay Tiêu Dùng Tín Chấp VPBank Online",
    category: "loan",
    provider: "VPBank",
    providerInitial: "VP",
    themeColor: "from-emerald-600 to-green-700",
    badgeText: "Duyệt tự động 15 phút",
    tagline: "Vay tiêu dùng nhanh không cần thế chấp tài sản, giải ngân siêu tốc về tài khoản mọi ngân hàng.",
    highlightBenefit: "Hạn mức đến 100 Triệu VNĐ",
    interestRate: "1.1% / tháng",
    interestRateDetail: "Từ 14% - 20%/năm tính theo dư nợ giảm dần",
    maxLimit: "100.000.000 đ",
    tenor: "12 - 48 tháng",
    approvalSpeed: "15 phút",
    disbursementTime: "Trong vòng 2 giờ",
    minIncome: "Từ 4.5 triệu/tháng",
    ageRange: "20 - 60 tuổi",
    requirements: [
      "Công dân Việt Nam tuổi từ 20 đến 60",
      "Có CCCD gắn chip còn hiệu lực",
      "Thu nhập chuyển khoản hoặc tiền mặt từ 4.5 triệu/tháng",
      "Không có nợ xấu tại CIC nhóm 3 trở lên"
    ],
    features: [
      "Không yêu cầu thế chấp tài sản hay bảo lãnh",
      "100% quy trình trực tuyến trên điện thoại",
      "Nhận tiền giải ngân thẳng vào tài khoản ATM",
      "Miễn phí làm hồ sơ và thẩm định"
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Bấm nút 'Đến trang đăng ký VPBank'",
        description: "Hệ thống chuyển bạn trực tiếp đến cổng đăng ký trực tuyến chính thức của VPBank.",
        tip: "Nên sử dụng điện thoại có camera rõ nét để chụp CCCD."
      },
      {
        stepNumber: 2,
        title: "Điền số điện thoại & Xác thực OTP",
        description: "Nhập số điện thoại chính chủ của bạn và điền mã OTP gửi về tin nhắn SMS để bắt đầu.",
        tip: "Số điện thoại chính chủ trùng khớp thông tin thuê bao giúp tăng 90% tỷ lệ duyệt."
      },
      {
        stepNumber: 3,
        title: "Chụp ảnh CCCD 2 mặt & Chân dung eKYC",
        description: "Chụp rõ 2 mặt thẻ CCCD gắn chip (không lóa sáng, không mất góc) và quay khuôn mặt theo hướng dẫn.",
        tip: "Đứng ở nơi đủ ánh sáng để hệ thống AI nhận diện thành công ngay lần đầu."
      },
      {
        stepNumber: 4,
        title: "Nhận phê duyệt hạn mức & Ký hợp đồng điện tử",
        description: "Hệ thống tự động chấm điểm tín dụng và hiển thị số tiền được vay. Bạn xác nhận hợp đồng qua OTP và nhận tiền sau 30 phút.",
        tip: "Kiểm tra kỹ số tài khoản ngân hàng thụ hưởng trước khi bấm ký xác nhận."
      }
    ],
    affiliateUrl: "https://vpbank.com.vn/personal/loans?utm_source=affiliate_sosanhkhoanvay&ref_code=SKV_VPBANK",
    commissionEstimate: "350.000đ - 650.000đ / hồ sơ giải ngân",
    clicksCount: 1420,
    rating: 4.9,
    totalReviews: 832,
    isPopular: true,
    featuredOrder: 1
  },
  {
    id: "fecredit-fast",
    name: "Vay Tiền Mặt Tiêu Dùng FE Credit",
    category: "loan",
    provider: "FE Credit",
    providerInitial: "FE",
    themeColor: "from-red-600 to-rose-700",
    badgeText: "Thủ tục đơn giản nhất",
    tagline: "Thương hiệu tài chính tiêu dùng thị phần số 1 Việt Nam, duyệt hồ sơ nhanh chỉ cần CCCD gắn chip.",
    highlightBenefit: "Chỉ cần CCCD gắn chip",
    interestRate: "1.4% / tháng",
    interestRateDetail: "Từ 1.4% - 2.2%/tháng tùy điểm tín dụng",
    maxLimit: "70.000.000 đ",
    tenor: "6 - 36 tháng",
    approvalSpeed: "15 - 30 phút",
    disbursementTime: "Trong ngày",
    minIncome: "Từ 3.0 triệu/tháng",
    ageRange: "20 - 60 tuổi",
    requirements: [
      "Công dân Việt Nam độ tuổi từ 20 đến 60",
      "Có CCCD gắn chip chính chủ",
      "Chấp nhận lao động tự do, công nhân hoặc nhân viên công ty",
      "Sim điện thoại chính chủ sử dụng trên 6 tháng"
    ],
    features: [
      "Không yêu cầu thế chấp tài sản",
      "Hồ sơ đơn giản, duyệt tự động",
      "Nhận tiền mặt tại bưu điện hoặc chuyển khoản qua tài khoản ngân hàng",
      "Hỗ trợ khách hàng chưa có lịch sử tín dụng"
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Truy cập cổng đăng ký FE Credit",
        description: "Bấm vào đường link đối tác chính thức để vào giao diện đăng ký khoản vay nhanh của FE Credit.",
        tip: "Chọn khoản vay vừa sức trả nợ để được duyệt nhanh hơn."
      },
      {
        stepNumber: 2,
        title: "Chọn số tiền vay và kỳ hạn trả góp",
        description: "Lựa chọn số tiền vay từ 10 đến 70 triệu đồng và kỳ hạn từ 6 đến 36 tháng.",
      },
      {
        stepNumber: 3,
        title: "Chụp ảnh CCCD 2 mặt & Định danh sinh trắc học",
        description: "Chụp ảnh căn cước công dân gắn chip rõ nét và quét khuôn mặt theo chỉ dẫn trên màn hình.",
        tip: "Đảm bảo CCCD không bị mờ chữ hoặc mất góc."
      },
      {
        stepNumber: 4,
        title: "Nhận tiền giải ngân",
        description: "Sau khi hệ thống phê duyệt, tiền sẽ được chuyển thẳng vào số tài khoản ngân hàng của bạn trong ngày.",
      }
    ],
    affiliateUrl: "https://fecredit.com.vn/vay-nhanh?utm_source=sosanhkhoanvay&ref=SKV_FECREDIT",
    commissionEstimate: "300.000đ - 550.000đ / hồ sơ giải ngân",
    clicksCount: 1250,
    rating: 4.75,
    totalReviews: 720,
    isPopular: true,
    featuredOrder: 2
  },
  {
    id: "vib-vay-tieu-dung",
    name: "Vay Tiêu Dùng Tín Chấp Cá Nhân VIB",
    category: "loan",
    provider: "VIB Bank",
    providerInitial: "VIB",
    themeColor: "from-blue-600 to-indigo-700",
    badgeText: "Hạn mức khủng đến 600 Triệu",
    tagline: "Khoản vay tiêu dùng cao cấp từ Ngân hàng Quốc Tế VIB, ưu đãi vượt trội cho khách hàng hưởng lương.",
    highlightBenefit: "Hạn mức tối đa 600 Triệu VNĐ",
    interestRate: "1.0% / tháng",
    interestRateDetail: "Từ 12% - 17%/năm tính theo dư nợ giảm dần",
    maxLimit: "600.000.000 đ",
    tenor: "12 - 60 tháng",
    approvalSpeed: "Trong ngày",
    disbursementTime: "24 giờ làm việc",
    minIncome: "Từ 7.0 triệu/tháng",
    ageRange: "21 - 58 tuổi",
    requirements: [
      "Độ tuổi từ 21 đến 58 tuổi",
      "Lương chuyển khoản qua ngân hàng tối thiểu 7.0 triệu/tháng",
      "Có hợp đồng lao động tối thiểu 12 tháng",
      "Lịch sử tín dụng CIC sạch, không có nợ quá hạn"
    ],
    features: [
      "Hạn mức vay cực cao lên tới 600 triệu đồng",
      "Thời hạn trả góp dài hạn tới 60 tháng giúp giảm áp lực hàng tháng",
      "Lãi suất cạnh tranh hàng đầu khối ngân hàng thương mại cổ phần",
      "Giải ngân trực tiếp vào tài khoản thanh toán VIB hoặc các ngân hàng khác"
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Bấm nút 'Đăng ký vay VIB'",
        description: "Truy cập cổng nhận hồ sơ ưu tiên từ đối tác của Ngân hàng Quốc Tế VIB.",
      },
      {
        stepNumber: 2,
        title: "Điền thông tin nơi làm việc & Thu nhập",
        description: "Nhập thông tin công ty đang công tác, chức vụ và mức thu nhập chuyển khoản bình quân hàng tháng.",
        tip: "Khách hàng nhận lương qua tài khoản VIB được hưởng mức lãi suất giảm thêm 0.5%/năm."
      },
      {
        stepNumber: 3,
        title: "Tải chứng từ sao kê tài khoản lương",
        description: "Tải file sao kê điện tử ngân hàng 3 tháng gần nhất để hệ thống thẩm định hạn mức.",
      },
      {
        stepNumber: 4,
        title: "Ký hợp đồng tín dụng & Nhận giải ngân",
        description: "Chuyên viên VIB liên hệ tư vấn hoàn tất hồ sơ và giải ngân tiền ngay khi ký kết.",
      }
    ],
    affiliateUrl: "https://vib.com.vn/vn/vay-tieu-dung?utm_source=sosanhkhoanvay&ref=SKV_VIB",
    commissionEstimate: "400.000đ - 800.000đ / hồ sơ thành công",
    clicksCount: 980,
    rating: 4.85,
    totalReviews: 540,
    isPopular: true,
    featuredOrder: 3
  },
  {
    id: "vietcredit-vay-tien-mat",
    name: "Vay Tiêu Dùng Thẻ Vay VietCredit",
    category: "loan",
    provider: "VietCredit",
    providerInitial: "VC",
    themeColor: "from-amber-600 to-orange-700",
    badgeText: "Miễn lãi 7 ngày đầu",
    tagline: "Cấp hạn mức tiền mặt dự phòng linh hoạt, rút tiền tại 15.000 cây ATM toàn quốc, chỉ tính lãi trên số tiền thực rút.",
    highlightBenefit: "Rút tiền mặt ATM 24/7",
    interestRate: "1.25% / tháng",
    interestRateDetail: "Từ 15% - 22%/năm, miễn lãi hoàn toàn 7 ngày đầu",
    maxLimit: "100.000.000 đ",
    tenor: "Tối đa 36 tháng linh hoạt",
    approvalSpeed: "30 phút",
    disbursementTime: "Rút tiền tức thì sau khi duyệt",
    minIncome: "Từ 4.0 triệu/tháng",
    ageRange: "18 - 55 tuổi",
    requirements: [
      "Công dân Việt Nam từ 18 đến 55 tuổi",
      "CCCD gắn chip còn thời hạn",
      "Có nguồn thu nhập ổn định từ 4.0 triệu/tháng trở lên",
      "Không có nợ xấu tại hệ thống CIC"
    ],
    features: [
      "Không rút tiền thì không phát sinh bất kỳ khoản lãi nào",
      "Miễn lãi suất 0% trong 7 ngày đầu tiên sau khi kích hoạt",
      "Rút tiền mặt tiện lợi tại mọi cây ATM ngân hàng trên toàn quốc",
      "Chủ động thanh toán nợ gốc bất kỳ lúc nào không bị phạt trả trước hạn"
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Truy cập liên kết VietCredit",
        description: "Bấm nút đăng ký để chuyển đến cổng thẩm định thẻ vay của Công ty Tài chính VietCredit.",
      },
      {
        stepNumber: 2,
        title: "Xác thực danh tính & Nhập thông tin công việc",
        description: "Điền họ tên, số CCCD và thông tin công việc hiện tại của bạn.",
      },
      {
        stepNumber: 3,
        title: "Định danh điện tử eKYC",
        description: "Chụp ảnh căn cước công dân và chân dung để hệ thống AI phê duyệt hạn mức thẻ tự động.",
        tip: "Chụp ảnh rõ ràng để hệ thống đối soát dữ liệu CCCD gắn chip tự động."
      },
      {
        stepNumber: 4,
        title: "Nhận thẻ và rút tiền mặt",
        description: "Kích hoạt mã thẻ ảo để rút tiền hoặc nhận thẻ cứng giao tận nơi trong 2-3 ngày làm việc.",
      }
    ],
    affiliateUrl: "https://vietcredit.vn/dang-ky-the-vay?utm_source=sosanhkhoanvay&ref=SKV_VIETCREDIT",
    commissionEstimate: "320.000đ - 600.000đ / thẻ kích hoạt",
    clicksCount: 890,
    rating: 4.8,
    totalReviews: 460,
    isPopular: false,
    featuredOrder: 4
  },
  {
    id: "shinhan-bank-luong",
    name: "Vay Tín Chấp Shinhan Bank (Dành Cho KH Lương)",
    category: "loan",
    provider: "Shinhan Bank",
    providerInitial: "SHB",
    themeColor: "from-sky-700 to-blue-900",
    badgeText: "Lãi suất thấp nhất thị trường",
    tagline: "Gói vay chuyên biệt từ Shinhan Bank Hàn Quốc dành riêng cho khách hàng đi làm hưởng lương chuyển khoản.",
    highlightBenefit: "Lãi siêu ưu đãi từ 0.8%/tháng",
    interestRate: "0.85% / tháng",
    interestRateDetail: "Từ 10.5% - 15%/năm tính trên dư nợ giảm dần",
    maxLimit: "500.000.000 đ",
    tenor: "12 - 60 tháng",
    approvalSpeed: "24h - 48h",
    disbursementTime: "1 - 2 ngày làm việc",
    minIncome: "Từ 6.0 triệu/tháng",
    ageRange: "21 - 58 tuổi",
    requirements: [
      "Khách hàng đi làm hưởng lương chuyển khoản qua tài khoản ngân hàng",
      "Mức lương thực nhận tối thiểu từ 6.0 triệu đồng/tháng",
      "Lịch sử tín dụng CIC tốt, không có nợ xấu hoặc nợ chú ý",
      "Có hợp đồng lao động chính thức tối thiểu 1 năm hoặc qua thời gian thử việc"
    ],
    features: [
      "Lãi suất cho vay tín chấp thấp nhất trong hệ thống ngân hàng",
      "Hạn mức vay lên đến 500 triệu hoặc gấp 12 - 18 lần lương tháng",
      "Không cần tài sản bảo đảm, bảo lãnh công ty",
      "Quy trình xử lý hồ sơ chuẩn mực ngân hàng quốc tế"
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Mở liên kết Shinhan Bank",
        description: "Bấm nút đăng ký để gửi thông tin đến bộ phận tín dụng khách hàng cá nhân Shinhan Bank.",
      },
      {
        stepNumber: 2,
        title: "Cung cấp mức lương & Công ty công tác",
        description: "Điền thông tin công ty nơi đang làm việc và mức lương chuyển khoản bình quân 3 tháng gần nhất.",
        tip: "Khách hàng công tác tại các tập đoàn lớn, công ty nước ngoài được duyệt hạn mức tối đa."
      },
      {
        stepNumber: 3,
        title: "Tải sao kê tài khoản lương ngân hàng",
        description: "Cung cấp file PDF sao kê tài khoản ngân hàng nhận lương (tải từ ứng dụng Internet Banking của bạn).",
      },
      {
        stepNumber: 4,
        title: "Chuyên viên Shinhan Bank liên hệ thẩm định",
        description: "Chuyên viên tín dụng liên hệ hỗ trợ hồ sơ tận nơi và giải ngân trực tiếp vào tài khoản của bạn.",
      }
    ],
    affiliateUrl: "https://shinhan.com.vn/vi/personal/vay-tieu-dung-tin-chap.html?ref=sosanhkhoanvay_shinhan",
    commissionEstimate: "500.000đ - 1.200.000đ / hồ sơ giải ngân",
    clicksCount: 1120,
    rating: 4.92,
    totalReviews: 690,
    isPopular: true,
    featuredOrder: 5
  },
  {
    id: "lotte-finance",
    name: "Lotte Finance Vay Tiêu Dùng Linh Hoạt",
    category: "loan",
    provider: "Lotte Finance",
    providerInitial: "LF",
    themeColor: "from-rose-600 to-red-700",
    badgeText: "Đa dạng hình thức chứng minh",
    tagline: "Thương hiệu tài chính từ tập đoàn Lotte Hàn Quốc, chấp nhận nhiều hình thức chứng minh thu nhập linh hoạt.",
    highlightBenefit: "Vay theo Hóa đơn / Lương / BHYT",
    interestRate: "1.35% / tháng",
    interestRateDetail: "Từ 16% - 24%/năm theo quy định NHNN",
    maxLimit: "70.000.000 đ",
    tenor: "6 - 36 tháng",
    approvalSpeed: "30 phút",
    disbursementTime: "Trong ngày",
    minIncome: "Từ 3.5 triệu/tháng",
    ageRange: "20 - 60 tuổi",
    requirements: [
      "Công dân Việt Nam tuổi từ 20 đến 60",
      "Có CCCD gắn chip chính chủ",
      "Có 1 trong các giấy tờ: Bảng lương / BHYT / Hóa đơn điện nước / Hợp đồng bảo hiểm nhân thọ"
    ],
    features: [
      "Không bắt buộc phải có hợp đồng lao động chính thức",
      "Thời gian thẩm định và phản hồi hồ sơ nhanh chóng",
      "Thanh toán dễ dàng qua chuyển khoản hoặc các điểm thu hộ toàn quốc",
      "Bảo mật thông tin khách hàng tuyệt đối"
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Mở liên kết Lotte Finance",
        description: "Truy cập mẫu đơn đăng ký trực tuyến chính thức của Lotte Finance.",
      },
      {
        stepNumber: 2,
        title: "Lựa chọn hình thức chứng minh sẵn có",
        description: "Chọn phương thức chứng minh: theo Hóa đơn tiện ích, Thẻ BHYT hoặc Hợp đồng lao động.",
      },
      {
        stepNumber: 3,
        title: "Xác thực e-KYC thông minh",
        description: "Chụp ảnh căn cước công dân gắn chip và khuôn mặt theo hướng dẫn.",
        tip: "Chụp ảnh rõ nét, không bị bóng đèn phản chiếu."
      },
      {
        stepNumber: 4,
        title: "Ký kết điện tử & Giải ngân tiền",
        description: "Nhận tiền giải ngân chuyển thẳng vào số tài khoản ngân hàng của bạn trong ngày.",
      }
    ],
    affiliateUrl: "https://lottefinance.com.vn/web/vay-nhanh?source=sosanhkhoanvay",
    commissionEstimate: "320.000đ - 600.000đ / hồ sơ",
    clicksCount: 790,
    rating: 4.72,
    totalReviews: 380,
    isPopular: false,
    featuredOrder: 6
  },

  // ==========================================
  // --- 2. SẢN PHẨM THẺ TÍN DỤNG NGÂN HÀNG ---
  // ==========================================
  {
    id: "the-vpbank-stepup",
    name: "Thẻ Tín Dụng VPBank StepUp Mastercard",
    category: "card",
    provider: "VPBank",
    providerInitial: "VP",
    themeColor: "from-emerald-700 to-teal-800",
    badgeText: "Hoàn tới 15% Mua Sắm Online",
    tagline: "Chiếc thẻ quốc dân cho tín đồ Shopee, Lazada, Tiki, Grab và ăn uống cuối tuần.",
    highlightBenefit: "Hoàn tới 15% Shopee, Tiki, Grab",
    interestRate: "0% lãi suất tới 45 ngày",
    interestRateDetail: "Lãi suất sau thời gian miễn lãi: 2.33%/tháng",
    maxLimit: "500.000.000 đ",
    tenor: "Miễn lãi 45 ngày",
    approvalSpeed: "100% Online",
    disbursementTime: "Thẻ ảo dùng sau 2 giờ",
    minIncome: "Từ 4.5 triệu/tháng",
    ageRange: "20 - 60 tuổi",
    requirements: [
      "Công dân Việt Nam từ 20 tuổi trở lên",
      "Thu nhập từ 4.5 triệu đồng/tháng trở lên",
      "Có lịch sử chi tiêu tốt hoặc có tài khoản ngân hàng hoạt động thường xuyên",
      "CCCD gắn chip chính chủ"
    ],
    features: [
      "Hoàn tiền 15% khi thanh toán Grab, Be, Shopee, Lazada, Tiki",
      "Miễn phí thường niên năm đầu hoặc trọn đời khi đạt doanh số chi tiêu",
      "Trả góp 0% lãi suất tại hơn 10.000 đối tác trên toàn quốc",
      "Bảo hiểm gian lận thẻ toàn cầu miễn phí"
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Truy cập cổng mở thẻ VPBank",
        description: "Bấm vào đường link để vào biểu mẫu đăng ký thẻ tín dụng VPBank StepUp ưu tiên.",
      },
      {
        stepNumber: 2,
        title: "Nhập thông tin cá nhân & Nghề nghiệp",
        description: "Điền họ tên, số điện thoại và chụp ảnh CCCD để hệ thống thẩm định tức thì.",
      },
      {
        stepNumber: 3,
        title: "Phê duyệt hạn mức tự động bằng AI",
        description: "Hệ thống tự động phê duyệt hạn mức thẻ dựa trên điểm tín nhiệm công dân số.",
      },
      {
        stepNumber: 4,
        title: "Kích hoạt thẻ ảo dùng ngay",
        description: "Kích hoạt thẻ phi vật lý để liên kết Apple Pay, Google Pay mua sắm tức thì. Thẻ cứng gửi về nhà sau 3-5 ngày.",
      }
    ],
    affiliateUrl: "https://vpbank.com.vn/ca-nhan/the-tin-dung/stepup?ref=sosanhkhoanvay_card",
    commissionEstimate: "400.000đ - 700.000đ / thẻ thành công",
    clicksCount: 1450,
    rating: 4.88,
    totalReviews: 760,
    isPopular: true,
    featuredOrder: 7
  },
  {
    id: "the-vib-cashback",
    name: "Thẻ Tín Dụng VIB Cash Back & Super Card",
    category: "card",
    provider: "VIB Bank",
    providerInitial: "VIB",
    themeColor: "from-blue-700 to-cyan-600",
    badgeText: "Hoàn tiền tới 15% mọi chi tiêu",
    tagline: "Dòng thẻ tín dụng hoàn tiền dẫn đầu thị trường Việt Nam, miễn lãi tối đa 55 ngày cho mọi giao dịch.",
    highlightBenefit: "Hoàn tiền tối đa 24 triệu/năm",
    interestRate: "0% lãi suất tới 55 ngày",
    interestRateDetail: "Lãi suất sau thời gian miễn lãi: 2.19%/tháng",
    maxLimit: "600.000.000 đ",
    tenor: "Miễn lãi 55 ngày",
    approvalSpeed: "Duyệt online 30 phút",
    disbursementTime: "Phát hành thẻ phi vật lý dùng ngay",
    minIncome: "Từ 7.0 triệu/tháng",
    ageRange: "22 - 65 tuổi",
    requirements: [
      "Công dân Việt Nam từ 22 đến 65 tuổi",
      "Thu nhập lương từ 7.0 triệu/tháng (Hà Nội, TP.HCM) hoặc 5.0 triệu (các tỉnh khác)",
      "Không có nợ xấu trên hệ thống CIC",
      "CCCD gắn chip còn hiệu lực"
    ],
    features: [
      "Hoàn tiền không giới hạn cho các ngành ẩm thực, mua sắm, siêu thị, bảo hiểm",
      "Miễn phí thường niên năm đầu khi thỏa điều kiện chi tiêu",
      "Kích hoạt thẻ ảo thanh toán Apple Pay, Google Pay chỉ sau 30 phút",
      "Quản lý thẻ thông minh 100% trên ứng dụng MyVIB"
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Bấm nút 'Đăng ký mở thẻ VIB'",
        description: "Chuyển hướng đến cổng phát hành thẻ tín dụng trực tuyến 100% của Ngân hàng Quốc Tế VIB.",
      },
      {
        stepNumber: 2,
        title: "Điền thông tin cá nhân & Nghề nghiệp",
        description: "Điền họ tên, số điện thoại, công ty đang công tác và mức thu nhập hàng tháng.",
      },
      {
        stepNumber: 3,
        title: "Định danh điện tử eKYC thông minh",
        description: "Chụp 2 mặt CCCD và quét khuôn mặt theo chuẩn bảo mật sinh trắc học ngân hàng.",
        tip: "Hệ thống AI của VIB sẽ tự động điền các trường thông tin từ chip CCCD."
      },
      {
        stepNumber: 4,
        title: "Duyệt cấp hạn mức & Sử dụng thẻ ngay",
        description: "Nhận thông báo phê duyệt hạn mức. Thẻ phi vật lý kích hoạt trong 30 phút dùng ngay trên Apple Pay, thẻ cứng chuyển phát tận nhà sau 3-5 ngày.",
      }
    ],
    affiliateUrl: "https://vib.com.vn/vn/the-tin-dung/vib-cash-back?utm_source=sosanhkhoanvay&campaign=vib_cashback",
    commissionEstimate: "450.000đ - 850.000đ / thẻ mở thành công",
    clicksCount: 1680,
    rating: 4.95,
    totalReviews: 980,
    isPopular: true,
    featuredOrder: 8
  },
  {
    id: "the-liobank-digital",
    name: "Thẻ Tín Dụng Số Thế Hệ Mới Liobank",
    category: "card",
    provider: "Liobank",
    providerInitial: "LIO",
    themeColor: "from-purple-700 to-indigo-800",
    badgeText: "Ngân hàng số - Hoàn tiền 10%",
    tagline: "Chiếc thẻ 2 trong 1 (thẻ ghi nợ + thẻ tín dụng), mở thẻ 100% trên ứng dụng điện thoại chỉ trong 5 phút, không thủ tục rườm rà.",
    highlightBenefit: "Mở thẻ online 5 phút - Hoàn tiền 10%",
    interestRate: "0% lãi suất tới 62 ngày",
    interestRateDetail: "Miễn lãi dài nhất thị trường tới 62 ngày, lãi sau miễn lãi: 2.1%/tháng",
    maxLimit: "300.000.000 đ",
    tenor: "Miễn lãi lên tới 62 ngày",
    approvalSpeed: "5 phút tự động",
    disbursementTime: "Dùng thẻ ảo sau 5 phút",
    minIncome: "Từ 4.0 triệu/tháng",
    ageRange: "18 - 60 tuổi",
    requirements: [
      "Độ tuổi từ 18 tuổi trở lên",
      "Có điện thoại thông minh cài đặt ứng dụng Liobank",
      "CCCD gắn chip chính chủ",
      "Không có nợ xấu tại hệ thống CIC"
    ],
    features: [
      "Thời gian miễn lãi kỷ lục lên tới 62 ngày",
      "Hoàn tiền tới 10% cho các danh mục tự chọn hàng tháng (ăn uống, giải trí, mua sắm)",
      "Thẻ 2 trong 1 tích hợp cả tính năng ATM ghi nợ và thẻ tín dụng",
      "Giao diện ứng dụng cực kỳ trẻ trung, hiện đại, hỗ trợ chăm sóc 24/7"
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Bấm nút 'Mở thẻ Liobank ngay'",
        description: "Chuyển tiếp đến đường link tải app và đăng ký ưu tiên của ngân hàng số Liobank.",
      },
      {
        stepNumber: 2,
        title: "Tải ứng dụng Liobank & Nhập số điện thoại",
        description: "Cài đặt ứng dụng Liobank trên App Store hoặc Google Play và nhập số điện thoại để đăng ký.",
      },
      {
        stepNumber: 3,
        title: "Quét chip CCCD bằng NFC & Nhận diện khuôn mặt",
        description: "Áp thẻ CCCD gắn chip vào mặt lưng điện thoại để quét chip NFC siêu nhanh và quét khuôn mặt.",
        tip: "Tính năng quét NFC đọc thông tin chip trong 3 giây cực kỳ tiện lợi và chính xác."
      },
      {
        stepNumber: 4,
        title: "Nhận hạn mức tín dụng & Kích hoạt thẻ dùng ngay",
        description: "Hệ thống thông báo hạn mức tín dụng được cấp. Bạn có thể sử dụng thẻ ảo mua sắm online hoặc đặt thẻ vật lý giao tận nhà miễn phí.",
      }
    ],
    affiliateUrl: "https://liobank.vn/open-card?ref=sosanhkhoanvay_liobank",
    commissionEstimate: "350.000đ - 600.000đ / thẻ kích hoạt",
    clicksCount: 1350,
    rating: 4.9,
    totalReviews: 810,
    isPopular: true,
    featuredOrder: 9
  }
];

export const VIETNAM_PROVINCES = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "Bình Dương",
  "Đồng Nai",
  "Bà Rịa - Vũng Tàu",
  "Bắc Ninh",
  "Quảng Ninh",
  "Thanh Hóa",
  "Nghệ An",
  "Thái Nguyên",
  "Vĩnh Phúc",
  "Khánh Hòa",
  "Lâm Đồng",
  "Tỉnh khác (Toàn quốc)"
];

export const INCOME_RANGES = [
  "Dưới 5 triệu / tháng",
  "Từ 5 - 10 triệu / tháng",
  "Từ 10 - 20 triệu / tháng",
  "Từ 20 - 35 triệu / tháng",
  "Trên 35 triệu / tháng"
];

export const LOAN_AMOUNTS = [
  "10.000.000 đ",
  "20.000.000 đ",
  "30.000.000 đ",
  "50.000.000 đ",
  "70.000.000 đ",
  "100.000.000 đ",
  "Trên 100.000.000 đ"
];

export const CARD_LIMITS = [
  "Hạn mức 20 - 30 triệu",
  "Hạn mức 30 - 50 triệu",
  "Hạn mức 50 - 100 triệu",
  "Hạn mức trên 100 triệu"
];

export const FAQ_ITEMS = [
  {
    question: "Vay tiền hoặc mở thẻ tín dụng online qua sosanhkhoanvay.com có an toàn không?",
    answer: "Tuyệt đối an toàn. sosanhkhoanvay.com là nền tảng tiếp thị tài chính và giới thiệu trực tiếp đến các Ngân hàng thương mại (VPBank, VIB, Shinhan Bank...) và các Công ty tài chính được cấp phép chính thức bởi Ngân hàng Nhà nước Việt Nam (FE Credit, VietCredit, Lotte Finance, Liobank). Chúng tôi không bao giờ yêu cầu khách hàng nộp bất kỳ khoản phí nào trước khi giải ngân. Hotline tư vấn chính thức: 0583 345 345."
  },
  {
    question: "Tôi có bị mất phí dịch vụ hay phí làm hồ sơ không?",
    answer: "Hoàn toàn MIỄN PHÍ 100%. Mọi quy trình từ tư vấn, nộp hồ sơ, thẩm định cho đến giải ngân đều không thu phí của khách hàng. Nếu có bất kỳ ai yêu cầu bạn nộp tiền cọc hay 'phí hồ sơ', xin hãy cảnh giác vì đó là hành vi lừa đảo giả mạo ngân hàng. Bạn có thể gọi hotline 0583 345 345 để xác minh ngay."
  },
  {
    question: "Hồ sơ của tôi cần những giấy tờ gì để được duyệt nhanh nhất?",
    answer: "Hiện nay 90% các gói vay tiêu dùng và mở thẻ đều đã tích hợp định danh điện tử qua CCCD gắn chip. Bạn chỉ cần: 1) Thẻ CCCD gắn chip bản gốc; 2) Điện thoại smartphone có camera chụp ảnh rõ nét; 3) Sim điện thoại chính chủ. Nếu có thêm sao kê lương chuyển khoản (như Shinhan Bank, VIB) hoặc thẻ BHYT sẽ được duyệt hạn mức cao hơn và lãi suất tốt hơn."
  },
  {
    question: "Từng có nợ xấu hoặc trả chậm thì có đăng ký vay được không?",
    answer: "Tùy thuộc vào nhóm nợ trên CIC. Nếu bạn chỉ chậm thanh toán dưới 10 ngày (Nhóm 1) hoặc từng chậm dưới 30 ngày (Nhóm 2) đã tất toán xong, các đơn vị tài chính như FE Credit, VietCredit, Lotte Finance vẫn hỗ trợ xem xét duyệt hồ sơ. Đối với nợ nhóm 3 trở lên, chúng tôi khuyến nghị khách hàng tất toán dứt điểm trước khi đăng ký."
  },
  {
    question: "Quy trình từ lúc tôi đăng ký trên web đến khi nhận được link tự thao tác diễn ra như thế nào?",
    answer: "Rất đơn giản: Bước 1: Bạn chọn gói vay hoặc thẻ phù hợp trên sosanhkhoanvay.com -> Bước 2: Bấm 'Đăng ký vay/Mở thẻ' và điền thông tin liên hệ cơ bản -> Bước 3: Thông tin được lưu vào hệ thống chăm sóc bảo mật của chúng tôi -> Bước 4: Màn hình ngay lập tức cung cấp ĐƯỜNG LINK CHÍNH THỨC của ngân hàng để bạn tự thao tác nộp hồ sơ online 100%."
  }
];
