import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FontAwesome } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { StatusBar } from "expo-status-bar";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "test@example.com", password: "password123" },
    validationSchema: LoginSchema,
    onSubmit: async (
      values,
      { setErrors }: FormikHelpers<{ email: string; password: string }>
    ) => {
      try {
        const loggedIn = await login(values.email, values.password);
        if (loggedIn) {
          router.replace("/");
        } else {
          setErrors({ password: "Incorrect password" });
        }
      } catch (error) {
        setErrors({ password: "Incorrect password" });
      }
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <ImageBackground
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1673126680964-b9fc3587096c",
          }}
          style={styles.headerBackground}
        >
          <Text style={styles.title}>Log In</Text>
          <Text style={styles.subtitle}>
            Please sign in to your existing account
          </Text>
        </ImageBackground>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="example@gmail.com"
              placeholderTextColor="#666"
              value={formik.values.email}
              onChangeText={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {formik.touched.email && formik.errors.email && (
              <Text style={styles.errorText}>{formik.errors.email}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>PASSWORD</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Enter your password"
                placeholderTextColor="#666"
                value={formik.values.password}
                onChangeText={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <FontAwesome
                  name={showPassword ? "eye" : "eye-slash"}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            {formik.touched.password && formik.errors.password && (
              <Text style={styles.errorText}>{formik.errors.password}</Text>
            )}
          </View>

          <View style={styles.rememberContainer}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={rememberMe}
                onValueChange={setRememberMe}
                color={rememberMe ? "#FF6B2C" : undefined}
                style={styles.checkbox}
              />
              <Text style={styles.rememberText}>Remember me</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => formik.handleSubmit()}
          >
            <Text style={styles.loginButtonText}>LOG IN</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.signupLink}>SIGN UP</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.orText}>Or</Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.facebookButton}>
              <FontAwesome name="facebook" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.twitterButton}>
              <FontAwesome name="twitter" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.appleButton}>
              <FontAwesome name="apple" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 0.3,
    backgroundColor: "#0A0A1A",
    overflow: "hidden",
  },
  headerBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#DBDBDE",
    textAlign: "center",
  },
  formContainer: {
    flex: 0.7,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    padding: 24,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#666",
    fontSize: 12,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#F5F6FA",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  errorText: {
    color: "#FF6B2C",
    fontSize: 12,
    marginTop: 4,
  },
  rememberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 8,
    borderRadius: 4,
  },
  rememberText: {
    color: "#666",
    fontSize: 14,
  },
  forgotPassword: {
    color: "#FF6B2C",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#FF6B2C",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  signupText: {
    color: "#666",
    fontSize: 14,
  },
  signupLink: {
    color: "#FF6B2C",
    fontSize: 14,
    fontWeight: "500",
  },
  orText: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  facebookButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#395998",
    justifyContent: "center",
    alignItems: "center",
  },
  twitterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#169ce8",
    justifyContent: "center",
    alignItems: "center",
  },
  appleButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});
