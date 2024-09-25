import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Function to validate password strength
const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
  return passwordRegex.test(password);
};

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate password strength
  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Create new user
  const user = new User({ name, email, password, role });
  try {
    await user.save();
    res.status(201).json({
      message: "User registered successfully",
      name,
      email,
      userId: user._id,
      role: user.role,
    });
  } catch (error) {
    console.error("Error registering user:", error); // Log the error
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check for user
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d", // Token expiry
    }
  );

  res.status(200).json({
    token,
    user,
  });
};

// Get user profile
// Assuming you're using Express and Mongoose
export const getUserProfile = async (req, res) => {
  const userId = req.user._id; // Get the user ID from the request (assuming you use middleware to authenticate)

  try {
    const user = await User.findById(userId).populate("borrowedBooks"); // Populate borrowedBooks
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user profile" });
  }
};

// Update user information
export const updateUser = async (req, res) => {
  const { name, email, role } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.role = role || user.role;

  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error updating user" });
  }
};

