import { FinancialProduct } from '../types';

export const INITIAL_PRODUCTS: FinancialProduct[] = [
  // --- VAY TÍN CHẤP (PERSONAL CONSUMER LOANS) ---
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
        description: "Hệ thống sẽ chuyển bạn trực tiếp đến cổng đăng ký trực tuyến chính thức của VPBank.",
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
    affiliateUrl: "https://vpbank.com.vn/personal/loans?utm_source=affiliate_vaynhanh247&utm_medium=cpa&ref_code=VN247VP",
    commissionEstimate: "350.000đ - 650.000đ / hồ sơ giải ngân",
    clicksCount: 1420,
    rating: 4.9,
    totalReviews: 832,
    isPopular: true,
    featuredOrder: 1
  },
  {
    id: "mcredit-fast",
    name: "MCredit Vay Tiền Nhanh Tiêu Dùng",
    category: "loan",
    provider: "MCredit (MB Bank Group)",
    providerInitial: "MC",
    themeColor: "from-blue-600 to-indigo-700",
    badgeText: "Hỗ trợ nợ chú ý nhẹ",
    tagline: "Sản phẩm tài chính tiêu dùng trực thuộc Tập đoàn MB Bank và Shinsei Bank Nhật Bản.",
    highlightBenefit: "Giải ngân chỉ cần CCCD",
    interestRate: "1.25% / tháng",
    interestRateDetail: "Cố định từ 1.25% - 1.95%/tháng tùy điểm tín nhiệm",
    maxLimit: "70.000.000 đ",
    tenor: "6 - 36 tháng",
    approvalSpeed: "20 phút",
    disbursementTime: "Trong ngày",
    minIncome: "Từ 3.0 triệu/tháng",
    ageRange: "18 - 60 tuổi",
    requirements: [
      "Độ tuổi từ 18 đến 60 tuổi",
      "Có thẻ CCCD gắn chip bản gốc",
      "Chấp nhận lao động tự do hoặc công nhân, nhân viên văn phòng",
      "Sở hữu sim điện thoại chính chủ sử dụng > 6 tháng"
    ],
    features: [
      "Thủ tục siêu đơn giản, không thẩm định người thân",
      "Lãi suất ưu đãi cho khách hàng có bảo hiểm y tế hoặc hóa đơn điện",
      "Thanh toán linh hoạt qua Viettel Money, Momo hoặc chuyển khoản",
      "Bảo mật thông tin khoản vay tuyệt đối"
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Truy cập cổng đối tác MCredit",
        description: "Bấm vào đường link đăng ký đối tác chính thức để nhận ưu đãi lãi suất.",
      },
      {
        stepNumber: 2,
        title: "Lựa chọn số tiền & thời hạn vay",
        description: "Chọn số tiền bạn cần (từ 5 triệu đến 70 triệu) và kỳ hạn trả góp phù hợp với khả năng tài chính.",
      },
      {
        stepNumber: 3,
        title: "Tải ảnh CCCD & Giấy tờ bổ sung (nếu có)",
        description: "Chụp ảnh CCCD 2 mặt. Nếu có thêm BHYT hoặc sao kê tài khoản ngân hàng sẽ được duyệt hạn mức cao hơn.",
        tip: "Tải thêm BHYT sẽ tăng hạn mức vay thêm 15 - 20 triệu."
      },
      {
        stepNumber: 4,
        title: "Giải ngân tiền về thẻ ATM",
        description: "Tổng đài hoặc hệ thống tự động xác nhận trong 15-30 phút. Tiền được chuyển khoản ngay sau khi phê duyệt.",
      }
    ],
    affiliateUrl: "https://mcredit.com.vn/vay-nhanh-online?utm_source=affiliate_vaynhanh247&campaign=lead_gen",
    commissionEstimate: "280.000đ - 520.000đ / hồ sơ",
    clicksCount: 1195,
    rating: 4.8,
    totalReviews: 615,
    isPopular: true,
    featuredOrder: 2
  },
  {
    id: "shinhan-finance",
    name: "Shinhan Finance Vay Tiêu Dùng Lãi Thấp",
    category: "loan",
    provider: "Shinhan Finance",
    providerInitial: "SH",
    themeColor: "from-sky-700 to-blue-800",
    badgeText: "Lãi suất ưu đãi nhất",
    tagline: "Tập đoàn tài chính hàng đầu Hàn Quốc, gói vay hạn mức khủng lên đến 300 triệu đồng.",
    highlightBenefit: "Lãi suất cực mềm từ 0.99%/tháng",
    interestRate: "0.99% / tháng",
    interestRateDetail: "Từ 11.9% - 18%/năm theo dư nợ giảm dần",
    maxLimit: "300.000.000 đ",
    tenor: "12 - 48 tháng",
    approvalSpeed: "Trong 24h",
    disbursementTime: "24 giờ làm việc",
    minIncome: "Từ 5.0 triệu/tháng",
    ageRange: "21 - 58 tuổi",
    requirements: [
      "Đang đi làm có hợp đồng lao động hoặc giấy phép kinh doanh",
      "Thu nhập lương tối thiểu 5 triệu/tháng",
      "Lịch sử tín dụng tốt, không nợ xấu",
      "Hộ khẩu hoặc tạm trú tại các tỉnh thành Shinhan hỗ trợ"
    ],
    features: [
      "Hạn mức vay cao nhất phân khúc tín chấp tiêu dùng",
      "Lãi suất thuộc top thấp nhất thị trường",
      "Thời hạn trả góp dài hạn tới 48 tháng giúp nhẹ gánh hàng tháng",
      "Chăm sóc khách hàng chuẩn mực ngân hàng quốc tế"
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Chuyển tiếp đến hệ thống Shinhan",
        description: "Bấm nút lấy link để truy cập trực tiếp form tư vấn thẩm định độc quyền của Shinhan Finance.",
      },
      {
        stepNumber: 2,
        title: "Điền hồ sơ năng lực & Mức lương",
        description: "Điền thông tin công ty nơi đang làm việc và mức thu nhập hàng tháng.",
      },
      {
        stepNumber: 3,
        title: "Cung cấp sao kê ngân hàng 3 tháng",
        description: "Tải file PDF sao kê lương điện tử (tải từ Internet Banking các ngân hàng).",
      },
      {
        stepNumber: 4,
        title: "Chuyên viên liên hệ hoàn tất hợp đồng",
        description: "Chuyên viên thẩm định Shinhan liên hệ hẹn ký số hoặc ký tận nơi, giải ngân trong ngày.",
      }
    ],
    affiliateUrl: "https://shinhanfinance.com.vn/vay-tieu-dung?aff_id=vaynhanh247",
    commissionEstimate: "500.000đ - 1.200.000đ / hồ sơ thành công",
    clicksCount: 880,
    rating: 4.85,
    totalReviews: 440,
    isPopular: false,
    featuredOrder: 3
  },
  {
    id: "lotte-finance",
    name: "Lotte Finance Vay Theo Hóa Đơn & Lương",
    category: "loan",
    provider: "Lotte Finance",
    providerInitial: "LF",
    themeColor: "from-rose-600 to-red-700",
    badgeText: "Đa dạng hình thức chứng minh",
    tagline: "Thương hiệu tài chính từ tập đoàn Lotte Hàn Quốc, chấp nhận nhiều hình thức chứng minh tài chính.",
    highlightBenefit: "Vay theo Hóa đơn điện / BHYT",
    interestRate: "1.35% / tháng",
    interestRateDetail: "Từ 16% - 24%/năm",
    maxLimit: "70.000.000 đ",
    tenor: "6 - 36 tháng",
    approvalSpeed: "30 phút",
    disbursementTime: "Trong ngày",
    minIncome: "Từ 3.5 triệu/tháng",
    ageRange: "20 - 60 tuổi",
    requirements: [
      "Công dân Việt Nam tuổi 20-60",
      "Có CCCD gắn chip",
      "Có 1 trong các giấy tờ: Bảng lương / BHYT / Hóa đơn điện nước đứng tên / Hợp đồng bảo hiểm nhân thọ"
    ],
    features: [
      "Không bắt buộc phải có hợp đồng lao động",
      "Thời gian thẩm định nhanh gọn",
      "Thanh toán dễ dàng qua các chuỗi Lotte Mart, Viettel Post",
      "Nhiều chương trình quay số trúng thưởng định kỳ"
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Mở liên kết Lotte Finance",
        description: "Truy cập kênh hồ sơ ưu tiên từ đối tác tiếp thị.",
      },
      {
        stepNumber: 2,
        title: "Chọn loại giấy tờ sẵn có",
        description: "Tùy chọn chứng minh bằng CCCD + Hóa đơn điện tử hoặc Hợp đồng lao động.",
      },
      {
        stepNumber: 3,
        title: "Xác thực danh tính số e-KYC",
        description: "Quét khuôn mặt và căn cước để đối soát hệ thống quốc gia.",
      },
      {
        stepNumber: 4,
        title: "Ký kết và nhận giải ngân",
        description: "Nhận tiền trực tiếp vào số tài khoản bạn cung cấp.",
      }
    ],
    affiliateUrl: "https://lottefinance.com.vn/web/vay-nhanh?source=vaynhanh247",
    commissionEstimate: "320.000đ - 600.000đ / hồ sơ",
    clicksCount: 740,
    rating: 4.7,
    totalReviews: 310,
    isPopular: false,
    featuredOrder: 4
  },

  // --- THẺ TÍN DỤNG (CREDIT CARDS) ---
  {
    id: "vib-cashback",
    name: "Thẻ Tín Dụng VIB Cash Back Hoàn Tiền",
    category: "card",
    provider: "VIB Bank",
    providerInitial: "VIB",
    themeColor: "from-blue-700 to-cyan-600",
    badgeText: "Hoàn tiền tới 10% chi tiêu",
    tagline: "Thẻ tín dụng dẫn đầu xu hướng hoàn tiền tại Việt Nam, miễn lãi tối đa 55 ngày cho mọi giao dịch.",
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
      "Thu nhập chuyển khoản từ 7.0 triệu/tháng (TP.HCM/Hà Nội) hoặc 5.0 triệu (Tỉnh khác)",
      "Không có nợ xấu tại hệ thống CIC",
      "CCCD gắn chip còn hạn"
    ],
    features: [
      "Hoàn tiền không giới hạn cho các ngành ẩm thực, mua sắm, bảo hiểm",
      "Miễn phí thường niên năm đầu khi đạt điều kiện chi tiêu",
      "Kích hoạt thẻ ảo thanh toán Apple Pay, Google Pay tức thì",
      "Đổi tiền hoàn trực tiếp qua ứng dụng MyVIB chỉ với 1 chạm"
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Nhấn nút 'Đăng ký mở thẻ VIB'",
        description: "Chuyển hướng đến cổng phát hành thẻ tín dụng trực tuyến 100% của Ngân hàng Quốc Tế VIB.",
      },
      {
        stepNumber: 2,
        title: "Nhập thông tin cá nhân & Nghề nghiệp",
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
    affiliateUrl: "https://vib.com.vn/vn/the-tin-dung/vib-cash-back?utm_source=aff_partner&campaign=credit_card_cashback",
    commissionEstimate: "450.000đ - 850.000đ / thẻ mở thành công",
    clicksCount: 1650,
    rating: 4.95,
    totalReviews: 980,
    isPopular: true,
    featuredOrder: 5
  },
  {
    id: "vpbank-stepup",
    name: "Thẻ Tín Dụng VPBank StepUp Mastercard",
    category: "card",
    provider: "VPBank",
    providerInitial: "VP",
    themeColor: "from-emerald-700 to-teal-800",
    badgeText: "Hoàn 15% Mua Sắm Online",
    tagline: "Chiếc thẻ quốc dân cho tín đồ Shopee, Lazada, Tiki, Grab và ăn uống cuối tuần.",
    highlightBenefit: "Hoàn tới 15% Shopee, Tiki, Grab",
    interestRate: "0% lãi suất tới 45 ngày",
    interestRateDetail: "Lãi suất sau miễn lãi: 2.33%/tháng",
    maxLimit: "500.000.000 đ",
    tenor: "Miễn lãi 45 ngày",
    approvalSpeed: "100% Online",
    disbursementTime: "Thẻ ảo dùng sau 2 giờ",
    minIncome: "Từ 4.5 triệu/tháng",
    ageRange: "20 - 60 tuổi",
    requirements: [
      "Từ 20 tuổi trở lên",
      "Thu nhập chỉ từ 4.5 triệu đồng/tháng",
      "Có lịch sử chi tiêu tốt hoặc có tài khoản ngân hàng thường xuyên giao dịch",
      "CCCD gắn chip chính chủ"
    ],
    features: [
      "Hoàn tiền 15% khi thanh toán Grab, Be, Shopee, Lazada, Tiki",
      "Miễn phí thường niên trọn đời khi đạt doanh số chi tiêu",
      "Trả góp 0% lãi suất tại hơn 10.000 đối tác trên toàn quốc",
      "Bảo hiểm gian lận thẻ toàn cầu miễn phí"
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Truy cập liên kết VPBank Card",
        description: "Hệ thống đưa bạn vào mẫu đăng ký thẻ StepUp ưu tiên đối tác.",
      },
      {
        stepNumber: 2,
        title: "Xác thực danh tính & Nhập nhu cầu chi tiêu",
        description: "Điền thông tin và chụp ảnh CCCD để hệ thống thẩm định tức thì.",
      },
      {
        stepNumber: 3,
        title: "Phê duyệt hạn mức tự động",
        description: "Không cần chứng minh thu nhập phức tạp nếu có lịch sử giao dịch tốt tại các ngân hàng.",
      },
      {
        stepNumber: 4,
        title: "Nhận thẻ tại nhà hoặc liên kết ví điện tử",
        description: "Thẻ được gửi chuyển phát nhanh bảo đảm đến địa chỉ bạn cung cấp.",
      }
    ],
    affiliateUrl: "https://vpbank.com.vn/ca-nhan/the-tin-dung/stepup?ref=vaynhanh247_affiliate",
    commissionEstimate: "400.000đ - 700.000đ / thẻ",
    clicksCount: 1320,
    rating: 4.88,
    totalReviews: 760,
    isPopular: true,
    featuredOrder: 6
  },
  {
    id: "sacombank-visa",
    name: "Thẻ Tín Dụng Sacombank Visa Platinum",
    category: "card",
    provider: "Sacombank",
    providerInitial: "STB",
    themeColor: "from-blue-800 to-indigo-900",
    badgeText: "Đặc quyền phòng chờ sân bay",
    tagline: "Đẳng cấp thượng lưu với gói bảo hiểm du lịch toàn cầu trị giá 11.6 tỷ đồng và tích lũy dặm bay.",
    highlightBenefit: "Phòng chờ VIP sân bay & Trả góp 0%",
    interestRate: "0% lãi suất tới 55 ngày",
    interestRateDetail: "Từ 1.8%/tháng",
    maxLimit: "1.000.000.000 đ",
    tenor: "Miễn lãi 55 ngày",
    approvalSpeed: "1 - 2 ngày làm việc",
    disbursementTime: "Phát hành thẻ vật lý tận tay",
    minIncome: "Từ 10.0 triệu/tháng",
    ageRange: "22 - 65 tuổi",
    requirements: [
      "Công dân Việt Nam từ 22 tuổi trở lên",
      "Thu nhập chuyển khoản từ 10 triệu/tháng",
      "Không nợ xấu tại ngân hàng",
      "Hộ khẩu hoặc KT3 tại nơi có chi nhánh Sacombank"
    ],
    features: [
      "Tặng lượt vào phòng chờ hạng thương gia sân bay quốc tế",
      "Bảo hiểm du lịch toàn cầu với hạn mức bồi thường tới nửa triệu USD",
      "Giảm tới 50% tại hàng ngàn điểm ẩm thực, khách sạn 5 sao",
      "Dịch vụ hỗ trợ toàn cầu Visa Concierge 24/7"
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Vào trang đăng ký thẻ Sacombank",
        description: "Bấm vào nút liên kết chính thức để nhận chương trình miễn phí thường niên năm đầu.",
      },
      {
        stepNumber: 2,
        title: "Nhập thông tin tư vấn hồ sơ VIP",
        description: "Điền số điện thoại và mức thu nhập hàng tháng.",
      },
      {
        stepNumber: 3,
        title: "Chuyên viên quản lý khách hàng liên hệ",
        description: "Chuyên viên Sacombank gọi điện tư vấn và hỗ trợ thu hồ sơ tận nơi miễn phí.",
      },
      {
        stepNumber: 4,
        title: "Bàn giao thẻ đen Platinum tận tay",
        description: "Thẻ được niêm phong bảo mật gửi đến địa chỉ nhà riêng hoặc cơ quan.",
      }
    ],
    affiliateUrl: "https://sacombank.com.vn/the/visa-platinum?utm_source=vaynhanh247",
    commissionEstimate: "500.000đ - 900.000đ / thẻ",
    clicksCount: 910,
    rating: 4.82,
    totalReviews: 412,
    isPopular: false,
    featuredOrder: 7
  },
  {
    id: "shinhan-hipoint",
    name: "Thẻ Tín Dụng Shinhan Bank Hi-Point",
    category: "card",
    provider: "Shinhan Bank",
    providerInitial: "SH",
    themeColor: "from-sky-800 to-slate-900",
    badgeText: "Tích điểm tới 5% mọi chi tiêu",
    tagline: "Chi tiêu tích lũy điểm thưởng không giới hạn để đổi vé máy bay, voucher mua sắm và tiền mặt.",
    highlightBenefit: "Tích điểm 5% đổi dặm bay Vietnam Airlines",
    interestRate: "0% lãi suất tới 45 ngày",
    interestRateDetail: "Từ 1.95%/tháng",
    maxLimit: "300.000.000 đ",
    tenor: "Miễn lãi 45 ngày",
    approvalSpeed: "Online 24h",
    disbursementTime: "Phát hành thẻ sau 3 ngày",
    minIncome: "Từ 6.0 triệu/tháng",
    ageRange: "20 - 65 tuổi",
    requirements: [
      "Công dân từ 20 đến 65 tuổi",
      "Lương chuyển khoản ngân hàng tối thiểu 6.0 triệu/tháng",
      "Không nợ quá hạn tại CIC",
      "Có hợp đồng lao động tối thiểu 12 tháng"
    ],
    features: [
      "Nhận ngay 1.100.000 điểm chào mừng khi kích hoạt và chi tiêu",
      "Tích lũy điểm thưởng 5% tại các đối tác ẩm thực, giải trí và du lịch",
      "Đổi điểm linh hoạt sang Dặm bông sen vàng hoặc hoàn tiền",
      "Ưu đãi giảm giá 30% tại các nhà hàng Hàn Quốc và Lotte Cinema"
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Bấm nút 'Đăng ký Shinhan Bank'",
        description: "Truy cập cổng tiếp nhận hồ sơ trực tuyến dành riêng cho khách hàng đối tác.",
      },
      {
        stepNumber: 2,
        title: "Nhập thông tin cá nhân cơ bản",
        description: "Điền họ tên, số điện thoại, email và khu vực đang sinh sống.",
      },
      {
        stepNumber: 3,
        title: "Tải chứng từ sao kê lương",
        description: "Tải hình ảnh hoặc file sao kê tài khoản ngân hàng để hệ thống xác thực.",
      },
      {
        stepNumber: 4,
        title: "Ký hợp đồng và nhận thẻ tận nơi",
        description: "Ngân hàng gửi mã thẻ sử dụng và chuyển phát thẻ vật lý đến nhà bạn.",
      }
    ],
    affiliateUrl: "https://shinhan.com.vn/vi/personal/the-tin-dung-hi-point.html?aff=vaynhanh247",
    commissionEstimate: "450.000đ - 750.000đ / thẻ",
    clicksCount: 680,
    rating: 4.79,
    totalReviews: 290,
    isPopular: false,
    featuredOrder: 8
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
    question: "Vay tiền hoặc mở thẻ tín dụng online qua VayNhanh247 có an toàn không?",
    answer: "Tuyệt đối an toàn. VayNhanh247 là nền tảng tiếp thị tài chính và giới thiệu trực tiếp đến các Ngân hàng thương mại (VPBank, VIB, Sacombank, Shinhan...) và các Công ty tài chính được cấp phép chính thức bởi Ngân hàng Nhà nước Việt Nam (MCredit, Lotte Finance). Chúng tôi không bao giờ yêu cầu khách hàng nộp bất kỳ khoản phí nào trước khi giải ngân."
  },
  {
    question: "Tôi có bị mất phí dịch vụ hay phí làm hồ sơ không?",
    answer: "Hoàn toàn MIỄN PHÍ 100%. Mọi quy trình từ tư vấn, nộp hồ sơ, thẩm định cho đến giải ngân đều không thu phí của khách hàng. Nếu có bất kỳ ai yêu cầu bạn nộp tiền cọc hay 'phí hồ sơ', xin hãy cảnh giác vì đó là hành vi lừa đảo giả mạo ngân hàng."
  },
  {
    question: "Hồ sơ của tôi cần những giấy tờ gì để được duyệt nhanh nhất?",
    answer: "Hiện nay 90% các gói vay tiêu dùng và mở thẻ đều đã tích hợp định danh điện tử qua CCCD gắn chip. Bạn chỉ cần: 1) Thẻ CCCD gắn chip bản gốc; 2) Điện thoại smartphone có camera chụp ảnh rõ nét; 3) Sim điện thoại chính chủ. Nếu có thêm sao kê lương hoặc thẻ BHYT sẽ được duyệt hạn mức cao hơn và lãi suất tốt hơn."
  },
  {
    question: "Từng có nợ xấu hoặc trả chậm thì có đăng ký vay được không?",
    answer: "Tùy thuộc vào nhóm nợ trên CIC. Nếu bạn chỉ chậm thanh toán dưới 10 ngày (Nhóm 1) hoặc từng chậm dưới 30 ngày (Nhóm 2) đã tất toán xong, các đơn vị tài chính như MCredit, Lotte Finance vẫn hỗ trợ xem xét duyệt hồ sơ. Đối với nợ nhóm 3 trở lên, chúng tôi khuyến nghị khách hàng tất toán dứt điểm trước khi đăng ký."
  },
  {
    question: "Quy trình từ lúc tôi đăng ký trên web đến khi nhận được link tự thao tác diễn ra như thế nào?",
    answer: "Rất đơn giản: Bước 1: Bạn chọn gói vay hoặc thẻ phù hợp trên web -> Bước 2: Bấm 'Đăng ký vay/Mở thẻ' và điền thông tin liên hệ cơ bản -> Bước 3: Thông tin được lưu vào hệ thống chăm sóc bảo mật của chúng tôi -> Bước 4: Màn hình ngay lập tức cung cấp ĐƯỜNG LINK CHÍNH THỨC của ngân hàng để bạn tự thao tác nộp hồ sơ online 100%."
  }
];
