import axios from "axios";

export interface User {
  id: number;
  company: {
    name: string;
    department: string;
    address: {
      address: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
    };
  };
  hair: {
    color: string;
    type: string;
  };
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  age: number;
  hairColor: "Black" | "Blond" | "Chestnut" | "Brown";
  postalCode: string;
}

export interface DepartmentSummary {
  male: number;
  female: number;
  ageRanges: string[];
  hairColorCounts: Record<string, number>;
  addressUser: Record<string, string>;
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get("https://dummyjson.com/users");
    return response.data.users || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const groupByDepartment = (
  users: User[]
): Record<string, DepartmentSummary> => {
  return users.reduce((acc, user) => {
    const department = user?.company?.department || "Unknown";

    if (!acc[department]) {
      acc[department] = {
        male: 0,
        female: 0,
        ageRanges: [],
        hairColorCounts: {
          Black: 0,
          Blond: 0,
          Chestnut: 0,
          Brown: 0,
          Green: 0,
        },
        addressUser: {},
      };
    }

    if (user.gender === "male") {
      acc[department].male += 1;
    } else {
      acc[department].female += 1;
    }

    if (
      user.hairColor &&
      acc[department].hairColorCounts[user.hairColor] !== undefined
    ) {
      acc[department].hairColorCounts[user.hairColor] += 1;
    }

    const fullName = `${user.firstName}${user.lastName}`;
    const { address, city, state, country, postalCode } = user.company.address;

    acc[department].addressUser[
      fullName
    ] = `${address} ${city} ${state} ${country} ${postalCode}`;

    const ageRange = `${Math.floor(user.age / 10) * 10}-${
      Math.floor(user.age / 10) * 10 + 9
    }`;
    if (!acc[department].ageRanges.includes(ageRange)) {
      acc[department].ageRanges.push(ageRange);
    }

    return acc;
  }, {} as Record<string, DepartmentSummary>);
};

export const processUserData = async () => {
  const users = await fetchUsers();

  if (users.length > 0) {
    const groupedData = groupByDepartment(users);
    // console.log(JSON.stringify(groupedData, null, 2));
    return groupedData;
  } else {
    console.log("No users to process.");
  }
};
