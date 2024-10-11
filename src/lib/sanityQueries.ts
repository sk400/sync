import { groq } from "next-sanity";

export const getUserByEmailQuery = groq`*[_type == "user" && email == $email][0]`;

export const getUserByUsernameQuery = groq`*[_type == "user" && username == $username][0]`;

export const getUserByEmailOrUsername = groq`*[_type == "user" && (email == $email || username == $username)][0]`;

export const getUserByResetPasswordToken = groq`*[_type == "user" && resetPasswordToken == $token][0]`;
