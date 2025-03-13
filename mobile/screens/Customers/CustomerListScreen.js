import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getCustomers, getFilterOptions } from "../../api";
import CustomerFilters from "../../components/customers/customerFilters";
import Pagination from "../../components/common/pagination";
import { useAuth } from "../../context/AuthContext";

const CustomerListScreen = ({ navigation }) => {
  const { getValidAccessToken } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    page: 1,
    limit: 5,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [totalCustomers, setTotalCustomers] = useState(0);

  const [filters, setFilters] = useState({
    Custype: "",
    ZoneID: "",
    AreaID: "",
    SalesPerson: "",
  });

  const [filterOptions, setFilterOptions] = useState({
    CustomerCodes: [],
    Custypes: [],
    ZoneIDs: [],
    AreaIDs: [],
    SalesPersons: [],
  });

  const [customLimit, setCustomLimit] = useState("");

  // Add dependency on pagination.page to fetch new data when page changes
  useEffect(() => {
    loadFilterOptions();
    fetchCustomers({
      page: pagination.page,
      limit: pagination.limit,
      search: searchQuery,
      ...filters,
    });
  }, [pagination.page, pagination.limit]); // This will trigger a fetch when the page changes

  useEffect(() => {
    loadFilterOptions();
  }, []);

  const loadFilterOptions = async () => {
    try {
      const options = await getFilterOptions();
      if (options) {
        setFilterOptions({
          CustomerCodes: [...new Set(options.CustomerCodes || [])],
          Custypes: [...new Set(options.Custypes || [])],
          ZoneIDs: [...new Set(options.ZoneIDs || [])],
          AreaIDs: [...new Set(options.AreaIDs || [])],
          SalesPersons: [...new Set(options.SalesPersons || [])],
        });
      }
    } catch (error) {
      console.error("Error loading filter options:", error);
      Alert.alert("Error", "Failed to load filter options. Please try again.");
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    fetchCustomers({
      page: 1,
      limit: pagination.limit,
      search: searchQuery,
      ...filters,
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({
      Custype: "",
      ZoneID: "",
      AreaID: "",
      SalesPerson: "",
    });
    fetchCustomers({
      page: 1,
      limit: pagination.limit,
      search: searchQuery,
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
    setShowFilters(false);
  };

  const fetchCustomers = async (params = {}) => {
    try {
      setLoading(true);

      // Log the params being sent to the API
      //console.log("Fetching customers with params:", params);

      const response = await getCustomers(params);
      //console.log("Customer API response:", response);

      if (response && response.customers) {
        // Update customers based on the page
        setCustomers(response.customers);

        if (response.pagination) {
          setPagination(response.pagination);
          setTotalCustomers(response.pagination.total);
        }
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);

      Alert.alert("Error", "Failed to load customers. Please try again.");
      setCustomers([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchCustomers({
      page: 1,
      limit: pagination.limit,
      search: searchQuery,
      ...filters,
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSearch = () => {
    fetchCustomers({
      page: 1,
      limit: pagination.limit,
      search: searchQuery,
      ...filters,
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleLimitChange = (newLimit) => {
    const limit = parseInt(newLimit);
    if (limit > 0) {
      setPagination((prev) => ({
        ...prev,
        page: 1,
        limit: limit,
      }));
    }
  };

  const handlePageChange = (page) => {
    // Don't use setPagination in a setter function to avoid race conditions
    setPagination((prev) => ({
      ...prev,
      page: page,
    }));
    // The useEffect will handle fetching
  };

  const handleAddCustomer = () => {
    navigation.navigate("CustomerForm");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.customerCard}
      onPress={() =>
        navigation.navigate("CustomerDetails", { customerId: item._id })
      }
    >
      <View style={styles.customerHeader}>
        <Text style={styles.customerName}>{item.Name}</Text>
        <Text style={styles.customerCode}>{item.CustomerCode}</Text>
      </View>

      <View style={styles.customerInfo}>
        <View style={styles.infoRow}>
          <MaterialIcons name="phone" size={16} color="#6c757d" />
          <Text style={styles.infoText}>{item.Phone || "N/A"}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="email" size={16} color="#6c757d" />
          <Text style={styles.infoText}>{item.Email || "N/A"}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={16} color="#6c757d" />
          <Text style={styles.infoText}>{item.Address || "N/A"}</Text>
        </View>
      </View>

      <View style={styles.customerFooter}>
        <Text style={styles.typeText}>{item.Custype}</Text>
        <Text style={styles.balanceText}>
          Balance: {item.OpenBalance} {item.BalanceType}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#4a6cfa" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading && pagination.page === 1) return null;

    return (
      <View style={styles.emptyContainer}>
        <MaterialIcons name="people-outline" size={48} color="#6c757d" />
        <Text style={styles.emptyText}>No customers found</Text>
        <Text style={styles.emptySubtext}>
          Try adjusting your search or filters
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search customers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <MaterialIcons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <MaterialIcons
            name={showFilters ? "filter-list-off" : "filter-list"}
            size={24}
            color="#4a6cfa"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleAddCustomer}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <CustomerFilters
          filters={filters}
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
          onApplyFilters={handleApplyFilters}
          onReset={resetFilters}
        />
      )}

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          {loading && pagination.page === 1
            ? "Loading customers..."
            : `${totalCustomers} customers found`}
        </Text>
        <View style={styles.limitContainer}>
          <TextInput
            style={styles.limitInput}
            placeholder={`${pagination.limit}`}
            value={customLimit}
            onChangeText={setCustomLimit}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.limitButton}
            onPress={() => handleLimitChange(customLimit)}
          >
            <Text style={styles.limitButtonText}>per page</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={customers}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item._id || index}`} // Safe keyExtractor with index fallback
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={[
          styles.listContainer,
          customers.length === 0 && { flex: 1 },
        ]}
      />

      {/* Use the updated Pagination component with total items and items per page */}
      {customers.length > 0 && pagination.pages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pages}
          totalItems={pagination.total}
          itemsPerPage={pagination.limit}
          onPageChange={handlePageChange}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: "#4a6cfa",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4a6cfa",
    marginRight: 8, // Add spacing between filter and add button
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: "#4a6cfa",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  summaryText: {
    fontSize: 14,
    color: "#6c757d",
  },
  limitContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  limitInput: {
    height: 36,
    width: 50,
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
    paddingHorizontal: 0,
    marginRight: 4,
    borderWidth: 1,
    borderColor: "#dee2e6",
    textAlign: "center",
    textAlignVertical: "center", // Center text vertically (for Android)
    fontSize: 12, // Slightly smaller font size
    color: "#212529", // Darker text color
  },
  limitButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  limitButtonText: {
    color: "#6c757d",
    fontSize: 13,
  },
  listContainer: {
    padding: 16,
  },
  customerCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  customerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
  },
  customerCode: {
    fontSize: 14,
    color: "#4a6cfa",
    fontWeight: "500",
  },
  customerInfo: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoText: {
    marginLeft: 8,
    color: "#495057",
    fontSize: 14,
  },
  customerFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#dee2e6",
  },
  typeText: {
    fontSize: 13,
    color: "#6c757d",
    backgroundColor: "#e9ecef",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  balanceText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#212529",
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 8,
    textAlign: "center",
  },
});

export default CustomerListScreen;
