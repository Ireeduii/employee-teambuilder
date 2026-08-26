// // // "use client";

// // // import React from "react";
// // // import { Search, Bell } from "lucide-react";
// // // import { ModeToggle } from "./mode-toggle";
// // // import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

// // // export const Header = () => {
// // //   return (
// // //     <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
// // //       <div className="relative w-80">
// // //         <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
// // //         <input
// // //           type="text"
// // //           placeholder="Хайх утгаа оруулна уу..."
// // //           className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-slate-700 dark:text-slate-200 placeholder-slate-400"
// // //         />
// // //       </div>

// // //       <div className="flex items-center gap-3">
// // //         <ModeToggle />

// // //         <button className="relative p-2 text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
// // //           <Bell className="w-5 h-5" />
// // //           <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
// // //         </button>

// // //         <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

// // //         <div className="flex items-center gap-3">
// // //           <img
// // //             src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
// // //             alt="User Avatar"
// // //             className="w-9 h-9 rounded-full object-cover ring-2 ring-cyan-500/20"
// // //           />
// // //           <div className="text-left hidden sm:block">
// // //             <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-tight">
// // //               Admin
// // //             </p>
// // //             <p className="text-xs text-slate-400">Tech Lead</p>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </header>
// // //   );
// // // };

// // "use client";

// // import React from "react";
// // import { Search, Bell } from "lucide-react";
// // import { ModeToggle } from "./mode-toggle";
// // import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

// // export const Header = () => {
// //   return (
// //     <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
// //       <div className="relative w-80">
// //         <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
// //         <input
// //           type="text"
// //           placeholder="Хайх утгаа оруулна уу..."
// //           className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-slate-700 dark:text-slate-200 placeholder-slate-400"
// //         />
// //       </div>

// //       <div className="flex items-center gap-3">
// //         <ModeToggle />

// //         <button className="relative p-2 text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
// //           <Bell className="w-5 h-5" />
// //           <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
// //         </button>

// //         <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

// //         {/* Нэвтэрсэн үед профайл зураг болон цэс харагдана */}
// //         <SignedIn>
// //           <div className="flex items-center gap-2 pl-1">
// //             <UserButton
// //               afterSignOutUrl="/"
// //               appearance={{
// //                 elements: {
// //                   avatarBox: "w-9 h-9 ring-2 ring-cyan-500/20 rounded-full",
// //                 },
// //               }}
// //             />
// //           </div>
// //         </SignedIn>

// //         {/* Нэвтрээгүй үед 'Нэвтрэх' товч харагдана */}
// //         <SignedOut>
// //           <SignInButton mode="modal">
// //             <button className="px-4 py-2 text-sm font-medium bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-all shadow-sm shadow-cyan-500/20 active:scale-95">
// //               Нэвтрэх
// //             </button>
// //           </SignInButton>
// //         </SignedOut>
// //       </div>
// //     </header>
// //   );
// // };

// "use client";

// import React from "react";
// import { Search, Bell } from "lucide-react";
// import { ModeToggle } from "./mode-toggle";
// import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

// export const Header = () => {
//   return (
//     <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
//       <div className="relative w-80">
//         <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
//         <input
//           type="text"
//           placeholder="Хайх утгаа оруулна уу..."
//           className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-slate-700 dark:text-slate-200 placeholder-slate-400"
//         />
//       </div>

//       <div className="flex items-center gap-3">
//         <ModeToggle />

//         <button className="relative p-2 text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
//           <Bell className="w-5 h-5" />
//           <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
//         </button>

//         <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

//         <SignedIn>
//           <div className="flex items-center gap-2 pl-1">
//             <UserButton
//               appearance={{
//                 elements: {
//                   avatarBox: "w-9 h-9 ring-2 ring-cyan-500/20 rounded-full",
//                 },
//               }}
//             />
//           </div>
//         </SignedIn>

//         {/* Нэвтрээгүй үед */}
//         <SignedOut>
//           <SignInButton mode="modal">
//             <button className="px-4 py-2 text-sm font-medium bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-all shadow-sm shadow-cyan-500/20 active:scale-95">
//               Нэвтрэх
//             </button>
//           </SignInButton>
//         </SignedOut>
//       </div>
//     </header>
//   );
// };

"use client";

import React from "react";
import { Search, Bell } from "lucide-react";
import { ModeToggle } from "../theme/mode-toggle";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";

export const Header = () => {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="relative w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Хайх утгаа оруулна уу..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-slate-700 dark:text-slate-200 placeholder-slate-400"
        />
      </div>

      <div className="flex items-center gap-3">
        <ModeToggle />

        <button className="relative p-2 text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
        </button>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

        {/* Auth хэсэг */}
        {isLoaded && (
          <>
            {isSignedIn ? (
              <div className="flex items-center gap-2 pl-1">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 ring-2 ring-cyan-500/20 rounded-full",
                    },
                  }}
                />
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-sm font-medium bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-all shadow-sm shadow-cyan-500/20 active:scale-95">
                  Нэвтрэх
                </button>
              </SignInButton>
            )}
          </>
        )}
      </div>
    </header>
  );
};
