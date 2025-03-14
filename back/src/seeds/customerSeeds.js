const mongoose = require("mongoose");
const Customer = require("../models/customerModel");
const { mongodbURL } = require("../secret");

const customerSeeds = [
  {
    CusID: "CUS001",
    CompID: "COMP001",
    Name: "John's Electronics",
    Phone: "+880-1711-123456",
    Phone2: "+880-1811-123456",
    Email: "john@electronics.com",
    DebitHead: 50000,
    CreditHead: 30000,
    OpenBalance: 20000,
    Website: "www.johnselectronics.com",
    Address: "123 Main Street",
    City: "Dhaka",
    Zipcode: "1200",
    Country: "Bangladesh",
    ContactPerson: "John Smith",
    JobPosition: "Owner",
    ContactPhone: "+880-2-9876543",
    ContactMobile: "+880-1911-123456",
    ContactEmail: "john.smith@electronics.com",
    DeliveryAddress: "123 Main Street, Dhaka",
    BranchID: "BR001",
    CMdays: 30,
    DueLimit: 100000,
    TDS: 5,
    VDS: 3,
    AgentID: "AG001",
    BalanceType: "Credit",
    CustomerCode: "JE001",
    Type: "Wholesale",
    crefitlimit: 200000,
    SalesPerson: "David Wilson",
    AreaID: "AREA001",
    Code: "JE",
    Custype: "Regular",
    autocode: true,
    CusRemarks: "Reliable customer since 2019",
    BirthDate: new Date("1980-05-15"),
    IsLoyal: true,
    LoyaltyActivationDate: new Date("2020-01-01"),
    LoyalCardNo: "LOY001",
    ZoneID: "ZONE001",
  },
  {
    CusID: "CUS002",
    CompID: "COMP002",
    Name: "Sarah's Fashion House",
    Phone: "+880-1712-234567",
    Email: "sarah@fashion.com",
    DebitHead: 25000,
    CreditHead: 15000,
    OpenBalance: 10000,
    Address: "456 Fashion Street",
    City: "Chittagong",
    Zipcode: "4000",
    Country: "Bangladesh",
    ContactPerson: "Sarah Johnson",
    JobPosition: "CEO",
    ContactMobile: "+880-1912-234567",
    ContactEmail: "sarah.j@fashion.com",
    DeliveryAddress: "456 Fashion Street, Chittagong",
    BranchID: "BR002",
    CMdays: 15,
    DueLimit: 50000,
    CustomerCode: "SF001",
    Type: "Retail",
    crefitlimit: 100000,
    SalesPerson: "Emma Thompson",
    AreaID: "AREA002",
    Custype: "Premium",
    CusRemarks: "Fashion retailer",
    IsLoyal: true,
    LoyalCardNo: "LOY002",
    ZoneID: "ZONE002",
  },
  {
    CusID: "CUS003",
    CompID: "COMP003",
    Name: "Tech Solutions BD",
    Phone: "+880-1713-345678",
    Email: "info@techsolutions.com",
    DebitHead: 75000,
    CreditHead: 45000,
    OpenBalance: 30000,
    Website: "www.techsolutionsbd.com",
    Address: "789 Tech Park",
    City: "Sylhet",
    Zipcode: "3100",
    Country: "Bangladesh",
    ContactPerson: "Rahman Ahmed",
    ContactMobile: "+880-1913-345678",
    BranchID: "BR003",
    CustomerCode: "TS001",
    Type: "Corporate",
    SalesPerson: "Michael Brown",
    Custype: "Corporate",
    IsLoyal: false,
    ZoneID: "ZONE003",
  },
  {
    CusID: "CUS004",
    CompID: "COMP004",
    Name: "Global Imports Ltd",
    Phone: "880255667788",
    Phone2: "880299887766",
    Email: "contact@globalimports.com",
    DebitHead: 150000,
    CreditHead: 100000,
    OpenBalance: 50000,
    Website: "www.globalimports.com",
    Address: "Plot 45, Export Processing Zone",
    City: "Gazipur",
    Zipcode: "1700",
    Country: "Bangladesh",
    ContactPerson: "Abdul Karim",
    JobPosition: "Managing Director",
    ContactPhone: "880244556677",
    ContactMobile: "8801799887766",
    ContactEmail: "karim@globalimports.com",
    DeliveryAddress: "Warehouse 7, EPZ Road, Gazipur",
    BranchID: "BR004",
    CMdays: 45,
    DueLimit: 200000,
    TDS: 7,
    VDS: 4,
    AgentID: "AG004",
    BalanceType: "Debit",
    CustomerCode: "GI004",
    Type: "Corporate",
    crefitlimit: 500000,
    SalesPerson: "Rahim Khan",
    AreaID: "AREA004",
    Code: "GI",
    Custype: "Premium",
    autocode: false,
    CusRemarks: "Major importer with excellent credit history",
    BirthDate: new Date("1975-08-20"),
    IsLoyal: true,
    LoyaltyActivationDate: new Date("2019-03-15"),
    LoyalCardNo: "LOY004",
    ZoneID: "ZONE004",
  },
  {
    CusID: "CUS005",
    CompID: "COMP005",
    Name: "City Mart",
    Phone: "+880-1815-999888",
    Email: "citymart@retail.com",
    DebitHead: 15000,
    CreditHead: 25000,
    OpenBalance: -10000,
    Address: "Shop 12, New Market",
    City: "Rajshahi",
    Zipcode: "6000",
    Country: "Bangladesh",
    ContactPerson: "Fatima Begum",
    JobPosition: "Manager",
    ContactMobile: "8801915888777",
    BranchID: "BR005",
    CustomerCode: "CM005",
    Type: "Retail",
    crefitlimit: 75000,
    SalesPerson: "Nadia Islam",
    AreaID: "AREA005",
    Custype: "Regular",
    autocode: true,
    CusRemarks: "Small retail shop with steady growth",
    IsLoyal: false,
    ZoneID: "ZONE005",
  },
  {
    CusID: "CUS006",
    CompID: "COMP006",
    Name: "Super Electronics",
    Phone: "8801733444555",
    Phone2: "8801833444555",
    Email: "super@electronics.net",
    DebitHead: 80000,
    CreditHead: 60000,
    OpenBalance: 20000,
    Website: "www.superelectronics.com.bd",
    Address: "123/A, Electronic Market",
    City: "Khulna",
    Zipcode: "9000",
    Country: "Bangladesh",
    ContactPerson: "Mohammed Ali",
    JobPosition: "Proprietor",
    ContactPhone: "88041777888",
    ContactMobile: "8801633444555",
    ContactEmail: "mali@superelectronics.net",
    DeliveryAddress: "Warehouse 3, Industrial Area, Khulna",
    BranchID: "BR006",
    CMdays: 60,
    DueLimit: 150000,
    TDS: 5,
    VDS: 3,
    AgentID: "AG006",
    BalanceType: "Credit",
    CustomerCode: "SE006",
    Type: "Wholesale",
    crefitlimit: 300000,
    SalesPerson: "Kamal Hassan",
    AreaID: "AREA006",
    Code: "SE",
    Custype: "Premium",
    autocode: false,
    CusRemarks: "Leading electronics distributor in Khulna",
    BirthDate: new Date("1982-11-30"),
    IsLoyal: true,
    LoyaltyActivationDate: new Date("2021-01-01"),
    LoyalCardNo: "LOY006",
    ZoneID: "ZONE006",
  },
  {
    CusID: "CUS007",
    CompID: "COMP007",
    Name: "Green Agro Farm",
    Phone: "8801744555666",
    Email: "green@agrofarm.com",
    DebitHead: 35000,
    CreditHead: 45000,
    OpenBalance: -10000,
    Website: "www.greenagro.com",
    Address: "Village: Greenland, Post: Farming",
    City: "Rangpur",
    Zipcode: "5400",
    Country: "Bangladesh",
    ContactPerson: "Shamim Ahmed",
    JobPosition: "Farm Manager",
    ContactMobile: "8801944555666",
    DeliveryAddress: "Cold Storage Complex, Rangpur",
    BranchID: "BR007",
    CMdays: 30,
    DueLimit: 80000,
    AgentID: "AG007",
    BalanceType: "Debit",
    CustomerCode: "GA007",
    Type: "Corporate",
    crefitlimit: 150000,
    SalesPerson: "Jamil Hasan",
    AreaID: "AREA007",
    Code: "GA",
    Custype: "Regular",
    autocode: true,
    CusRemarks: "Organic produce supplier",
    IsLoyal: true,
    LoyaltyActivationDate: new Date("2022-06-15"),
    LoyalCardNo: "LOY007",
    ZoneID: "ZONE007",
  },
];

const seedCustomers = async () => {
  try {
    console.log("Seeding customers...");
    // Clear existing customers
    await Customer.deleteMany({});

    // Insert seed data
    await Customer.insertMany(customerSeeds);
    console.log("Customer seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding customers:", error);
  } finally {
    // Close the database connection when done
    mongoose.connection.close();
  }
};

// Connect to MongoDB and run the seeding function
mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("Connected to MongoDB");
    return seedCustomers();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

module.exports = seedCustomers;
