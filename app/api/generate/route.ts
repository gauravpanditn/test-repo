




// import { google } from "@ai-sdk/google";
// import { generateText, stepCountIs, tool } from "ai";
// import { Sandbox } from "e2b";
// import { z } from "zod";

// export async function POST(req: Request) {
//     let sandbox: Sandbox | undefined;

//     try {
//         const { prompt } = await req.json();

//         if (!prompt?.trim()) {
//             return Response.json(
//                 { error: "Prompt is required" },
//                 { status: 400 }
//             );
//         }

//         // 1. Create E2B sandbox
//         sandbox = await Sandbox.create();

//         console.log("Sandbox:", sandbox.sandboxId);

//         // 2. Create project directory
//         await sandbox.commands.run(
//             "mkdir -p /home/user/project"
//         );

//         // 3. writeFile tool
//         const writeFile = tool({
//             description:
//                 "Create or modify a website file inside /home/user/project.",

//             inputSchema: z.object({
//                 path: z.string(),
//                 content: z.string(),
//             }),

//             execute: async ({ path, content }) => {
//                 const safePath = `/home/user/project/${path}`;

//                 await sandbox!.files.write(
//                     safePath,
//                     content
//                 );

//                 console.log("Created:", safePath);

//                 return {
//                     success: true,
//                     path: safePath,
//                 };
//             },
//         });

//         // 4. readFile tool
//         const readFile = tool({
//             description:
//                 "Read a website file from /home/user/project.",

//             inputSchema: z.object({
//                 path: z.string(),
//             }),

//             execute: async ({ path }) => {
//                 const safePath = `/home/user/project/${path}`;

//                 const content =
//                     await sandbox!.files.read(safePath);

//                 return {
//                     success: true,
//                     path: safePath,
//                     content,
//                 };
//             },
//         });

//         // 5. runCommand tool
//         const runCommand = tool({
//             description:
//                 "Run a shell command inside /home/user/project.",

//             inputSchema: z.object({
//                 command: z.string(),
//             }),

//             execute: async ({ command }) => {
//                 const result =
//                     await sandbox!.commands.run(
//                         `cd /home/user/project && ${command}`
//                     );

//                 return {
//                     success: result.exitCode === 0,
//                     stdout: result.stdout,
//                     stderr: result.stderr,
//                     exitCode: result.exitCode,
//                 };
//             },
//         });

//         // 6. Gemini
//         const result = await generateText({
//             model: google("gemini-3.6-flash"),

//             system: `
// You are an AI website builder.

// The website must be created inside:

// /home/user/project

// IMPORTANT RULES:

// 1. All files MUST be created inside /home/user/project.
// 2. Never create files outside this directory.
// 3. Use the writeFile tool to actually create the files.
// 4. Do not just explain the code.
// 5. For a simple website, use:
//    - index.html
//    - style.css
//    - script.js
// 6. Make the website complete and visually polished.
// 7. index.html must load style.css and script.js correctly.
// 8. After creating the files, use readFile if necessary to verify them.
// 9. Use runCommand to check that the files exist.
// 10. Do NOT create a Vite project for a simple HTML/CSS/JS website.
// 11. Do NOT use npm.
// 12. Do NOT use python for generating the files.

// The user's request is:

// Create the requested website inside the sandbox.
// `,

//             prompt,

//             tools: {
//                 writeFile,
//                 readFile,
//                 runCommand,
//             },

//             maxRetries: 0,

//             stopWhen: stepCountIs(5),
//         });

//         console.log("AI:", result.text);

//         // 7. Verify files
//         const check =
//             await sandbox.commands.run(
//                 "cd /home/user/project && ls -la"
//             );

//         console.log(
//             "PROJECT FILES:",
//             check.stdout
//         );

//         // 8. Start simple HTTP server
//         await sandbox.commands.run(
//             "cd /home/user/project && python3 -m http.server 3000 --bind 0.0.0.0 > /tmp/server.log 2>&1 &"
//         );

//         // 9. Wait for server
//         await new Promise((resolve) =>
//             setTimeout(resolve, 2000)
//         );

//         // 10. Check server
//         const serverCheck =
//             await sandbox.commands.run(
//                 "curl -I http://127.0.0.1:3000"
//             );

//         console.log(
//             "SERVER:",
//             serverCheck.stdout
//         );

//         // 11. Get public E2B URL
//         const host =
//             sandbox.getHost(3000);

//         const sandboxUrl =
//             `https://${host}`;

//         console.log(
//             "PREVIEW:",
//             sandboxUrl
//         );

//         return Response.json({
//             success: true,
//             sandboxId: sandbox.sandboxId,
//             result: result.text,
//             sandboxUrl,
//         });

//     } catch (error) {
//         console.error(
//             "Generate error:",
//             error
//         );

//         return Response.json(
//             {
//                 error:
//                     error instanceof Error
//                         ? error.message
//                         : "Something went wrong",
//             },
//             { status: 500 }
//         );
//     }
// }