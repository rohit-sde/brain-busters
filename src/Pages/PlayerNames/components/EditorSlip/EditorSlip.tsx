import { useEffect, useRef } from "react";
import Loader from "../../../../Components/smallcomponents/loader/Loader";
import "./EditorSlip.css";
import { isNameOfGirl } from "../../../../funcs & conts/checkfuncs";
import { emojis } from "../../conts/conts";
import { data } from "react-router";

interface Player {
  playerName: string;
  isInput: boolean;
  character: string | null;
  gender: "M" | "F";
  isLoading: boolean;
}

interface argument {
  value: Player;
  setPlayersinfo: React.Dispatch<React.SetStateAction<Player[]>>;
  index: number;
}

const EditorSlip = ({ value, setPlayersinfo, index }: argument) => {
  const ref = useRef();

  async function setImageFromUrl(Url: string) {
    setPlayersinfo((prev: Player[]) =>
      prev.map((player, k) =>
        k === index ? { ...player, isLoading: true } : player
      )
    );
    try {
      // Fetch the image as a blob
      // console.log("URL", Url);
      const response = await fetch(Url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.blob(); // Assuming it's an image
      const imageUrl = URL.createObjectURL(data);

      // Log or use the image URL
      // console.log(imageUrl);

      setPlayersinfo((prev: Player[]) =>
        prev.map((player, k) =>
          index === k ? { ...player, character: imageUrl } : player
        )
      );
    } catch (error) {
      // setPlayersinfo((prev: Player[]) => {
      //   return prev.map((player, k) => {
      //     if (index === k) {
      //       return {
      //         ...player,
      //         character: emojis[Math.random() * 10],
      //         isLoading: false,
      //       };
      //     }
      //     return player;
      //   });
      // });
      console.error("Error downloading image:", error);
    }
    setPlayersinfo((prev: Player[]) =>
      prev.map((player, k) =>
        k === index ? { ...player, isLoading: false } : player
      )
    );
  }
  // setPlayersinfo((prev) => {
  //   return prev.map((player, k) => {
  //     if (i === k) {
  //       return { ...player, isLoading: false };
  //     }
  //     return player;
  //   });
  // });

  function handleEditBtn() {
    console.log("hello");
    const currentvalue = ref.current?.value;
    console.log("currentvalue", currentvalue);
    // if (currentvalue == value?.playerName) return;
    if (currentvalue && isNameOfGirl(currentvalue)) {
      console.log("1");
      setPlayersinfo((prev: Player[]) => {
        const updatedPlayer = {
          ...prev[index],
          gender: "F",
          playerName: currentvalue,
          isInput: !prev[index].isInput,
          // isLoading: true,
        };
        const URL = `https://avatar.iran.liara.run/public/girl`;
        setImageFromUrl(URL);
        return [...prev, updatedPlayer];
      });
      if (currentvalue) {
        console.log("2");
        setPlayersinfo((prev: Player[]) => {
          const updatedPlayer = {
            ...value,
            gender: "M",
            playerName: currentvalue,
            isInput: !value.isInput,
            // isLoading: true,
          };
          const URL = `https://avatar.iran.liara.run/public/boy`;
          setImageFromUrl(URL);
          return [...prev, updatedPlayer];
        });
      }
    }
    console.log("3");
    setPlayersinfo((prev: Player[]) => {
      const updatedobj = { ...value, isInput: !value.isInput };
      return prev.map((value, i) => (i === index ? updatedobj : value));
    });
  }

  //------------------------------------Dummie Copy----------------------------------------//

  // function handleEditBtn() {
  //   const currentvalue = ref.current?.value;

  //   setPlayersinfo((prev: Player[]) => {
  //     return prev.map((player, k: number) => {
  //       if (k === index && currentvalue && isNameOfGirl(currentvalue)) {
  //         const updatedPlayer = {
  //           ...player,
  //           gender: "F",
  //           playerName: currentvalue,
  //           isInput: !player.isInput,
  //           // isLoading: true,
  //         };
  //         //   const URL = `https://avatar.iran.liara.run/public/girl?username=${updatedPlayer.playerName}`;
  //         //   setImageFromUrl(URL, i);
  //         const URL = `https://avatar.iran.liara.run/public/girl`;
  //         setImageFromUrl(URL);
  //         return updatedPlayer;
  //       }
  //       if (k === index && currentvalue) {
  //         const updatedPlayer = {
  //           ...player,
  //           gender: "M",
  //           playerName: currentvalue,
  //           isInput: !player.isInput,
  //           // isLoading: true,
  //         };
  //         const URL = `https://avatar.iran.liara.run/public/boy`;
  //         setImageFromUrl(URL);
  //         return updatedPlayer;
  //       }
  //       if (k === index) {
  //         return {
  //           ...player,
  //           isInput: !player.isInput,
  //         };
  //       }
  //       return { ...player, isInput: false };
  //     });
  //   });
  // }
  function handleGender(gen: string) {
    setPlayersinfo((prev: Player[]) => {
      return prev.map((player: Player, k: number) => {
        if (index === k) {
          const updatedPlayer = { ...player, gender: gen };
          const URL = `https://avatar.iran.liara.run/public/${
            gen === "M" ? "boy" : "girl"
            //   }?username=${updatedPlayer.playerName}`;
          }`;
          setImageFromUrl(URL);
          return updatedPlayer;
        }
        return player;
      });
    });
  }
  useEffect(() => {
    // console.log("Players");
    setImageFromUrl("https://avatar.iran.liara.run/public/boy");
  }, []);
  // console.log("value.isLoading", value.isLoading);
  // console.log("value.character", value.character);
  return (
    <div className="editorSlip">
      {value?.isInput ? (
        <input
          className="nameInput"
          defaultValue={value?.playerName}
          ref={ref}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter") {
              handleEditBtn();
            }
          }}
        />
      ) : (
        <span className="editedName">{value?.playerName}</span>
      )}
      <button
        className="editButton"
        onClick={() => {
          handleEditBtn();
        }}
        type="submit"
      >
        {value.isInput ? "✔️" : "✏️"}
      </button>
      <span className="emojiFace">
        {/* <img src={`${value.character}`} /> */}
        {value.isLoading ? <Loader /> : <img src={`${value.character}`} />}
      </span>
      <button
        className={`genderBtn ${value.gender === "M" && "Active"}`}
        onClick={() => {
          handleGender("M");
        }}
      >
        M
      </button>
      <button
        className={`genderBtn ${value.gender === "F" && "Active"}`}
        onClick={() => {
          handleGender("F");
        }}
      >
        F
      </button>
    </div>
  );
};

export default EditorSlip;

// const inputRefs = useRef<React.RefObject<HTMLInputElement>[]>(
//   playersinfo.map(() => createRef())
// );
// const dispatch = useDispatch();
// const navigate = useNavigate();
// useEffect(() => {
//   playersinfo.map((player, i) => {
//     const URL = `https://avatar.iran.liara.run/public/${
//       player.gender === "M" ? "boy" : "girl"
//     }?username=${player.playerName}`;
//     setImageFromUrl(URL, i);
//   });
// }, []);

// useEffect(() => {
//   const inputToFocus = playersinfo.findIndex((player) => player.isInput);
//   if (inputToFocus >= 0 && inputRefs.current[inputToFocus]?.current) {
//     inputRefs.current[inputToFocus]?.current?.focus();
//   }
// }, [playersinfo]);

// function handleEditBtn(i: number) {
//   const currentvalue = inputRefs?.current[i]?.current?.value;

//   setPlayersinfo((prev) => {
//     return prev.map((player: object, k: number) => {
//       if (k === i && currentvalue && isNameOfGirl(currentvalue)) {
//         const updatedPlayer = {
//           ...player,
//           gender: "F",
//           playerName: currentvalue,
//           isInput: !player.isInput,
//           // isLoading: true,
//         };
//         const URL = `https://avatar.iran.liara.run/public/girl?username=${updatedPlayer.playerName}`;
//         setImageFromUrl(URL, i);
//         return updatedPlayer;
//       }
//       if (k === i && currentvalue) {
//         const updatedPlayer = {
//           ...player,
//           gender: "M",
//           playerName: currentvalue,
//           isInput: !player.isInput,
//           // isLoading: true,
//         };
//         const URL = `https://avatar.iran.liara.run/public/boy?username=${updatedPlayer.playerName}`;
//         setImageFromUrl(URL, i);
//         return updatedPlayer;
//       }
//       if (k === i) {
//         return {
//           ...player,
//           isInput: !player.isInput,
//         };
//       }
//       return { ...player, isInput: false };
//     });
//   });
// function handleGender(gen: string, i: number) {
//   setPlayersinfo((prev: Array) => {
//     return prev.map((player: object, k: number) => {
//       if (i === k) {
//         const updatedPlayer = { ...player, gender: gen };
//         const URL = `https://avatar.iran.liara.run/public/${
//           gen === "M" ? "boy" : "girl"
//         }?username=${updatedPlayer.playerName}`;
//         setImageFromUrl(URL, i);
//         return updatedPlayer;
//       }
//       return player;
//     });
//   });
// }
// }
// function handleNextPage() {
//   dispatch(SetPlayerDetails(playersinfo));
//   navigate("/PlayerNameing/GameBoard");
// }

// async function setImageFromUrl(Url: string, i: number) {
//   setPlayersinfo((prev) => {
//     return prev.map((player, k) => {
//       if (i === k) {
//         return { ...player, isLoading: true };
//       }
//       return player;
//     });
//   });
//   try {
//     // Fetch the image as a blob
//     const response = await fetch(Url);

//     // Check if the request was successful
//     if (!response.ok) {
//       throw new Error("Failed to fetch image");
//     }

//     // Convert the response into a Blob
//     const imageBlob = await response.blob();

//     // Create an object URL from the Blob
//     const imageObjectURL = URL.createObjectURL(imageBlob);

//     setPlayersinfo((prev) => {
//       return prev.map((player, k) => {
//         if (i === k) {
//           return { ...player, character: imageObjectURL };
//         }
//         return player;
//       });
//     });
//   } catch (error) {
//     const emojis = ["😊", "😍", "😎", "🥺", "😂", "🤔", "🙌", "💥", "🌟"];
//     // console.log("hello from i am infoForm", emojis);
//     setPlayersinfo((prev) => {
//       return prev.map((player, k) => {
//         if (i === k) {
//           return { ...player, character: emojis[Math.random() * 10] };
//         }
//         return player;
//       });
//     });
//     console.error("Error downloading image:", error);
//   }
//   setPlayersinfo((prev) => {
//     return prev.map((player, k) => {
//       if (i === k) {
//         return { ...player, isLoading: false };
//       }
//       return player;
//     });
//   });
// }
