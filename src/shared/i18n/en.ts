import type { TranslationDictionary } from "./types";

export const en = {
  "app.title": "Quest Game",
  "app.stageReady": "Stage 4 ready",
  "app.description":
    "The responsive page shell is ready. Its header, central area, and footer are composed with Mantine AppShell and share the same design-token system.",
  "app.technologyStack": "React · TypeScript · Vite · Mantine",
  "header.status.playing": "Game running",
  "header.status.won": "Victory",
  "header.status.dead": "Game over",
  "footer.description": "Built with React and TypeScript.",
  "footer.copyright": "© {{year}} Quest Game",
  "console.title": "F-5 Starlight // Terminal",
  "console.historyLabel": "Game history",
  "console.inputLabel": "Command",
  "console.placeholder.continue": "Press Enter to continue...",
  "console.placeholder.choice": "Enter an action number...",
  "console.placeholder.answer": "Enter the riddle answer...",
  "console.placeholder.finished": "The game is over",
  "console.action.continue": "Continue",
  "console.action.submit": "Submit",
  "console.action.answer": "Answer",
  "console.action.restart": "Play again",
  "locale.label": "Language",
  "locale.ru": "Русский",
  "locale.en": "English",
  "theme.switchToDark": "Switch to dark theme",
  "theme.switchToLight": "Switch to light theme",

  "intro.awakening":
    "You barely remember where you are... or even who you are...",
  "intro.belt":
    "Your body is pinned down, but your brain is already sending signs of life...\nIt says, ‘Seat belt’...",
  "intro.fall":
    "It is not your whole body—only your chest. Instinctively, you strike somewhere below your hip...\nA click—and suddenly you are falling...",
  "intro.memory":
    "You hit the deck with a small thud. Yes... that jolt has definitely woken your brain.\nThe last twenty-four hours return in a flash, though you would rather not remember them...",
  "intro.patrol":
    "Your 2nd Squadron was sent to patrol the space around Mephistocles-7.\nIt was another routine watch. For the last two years, almost every day had been the same.\nOnly the view of space changed... and what was there to see in it anyway?",
  "intro.gravity":
    "Your unit was tens of thousands of kilometres above the planet's surface.\nThen you noticed that green Mephistocles was growing larger... and kept growing.\nNo—the planet was not moving. Your entire unit was being dragged toward it like iron to a powerful magnet.",
  "intro.crash":
    "The last thing you remember is ten minutes of futile attempts to escape the magnetic grip.\nNow you are here... and apparently the landing did not go very well.\nThe energy shield saved the ship from critical damage, but almost no fuel remains.\nYou can make sense of what happened later. Right now, you need to find fuel.\nEither way, the first thing to do is leave the ship.",

  "starship.description":
    "You are inside your F-5 Starlight.\nYou need fuel, and it is obvious that you will not find it in here.\n\nAvailable actions:",
  "starship.choice.leave": "{{option}}. Leave the ship.",
  "starship.choice.escape": "{{option}}. Get off the planet.",
  "starship.leave": "You leave the ship.",

  "temple.description":
    "You are standing in a vast stone hall.\nAhead is a doorway with light shining through it.\nTo its right is another door—one that seemingly has not been used in a very long time.\n\nAvailable actions:",
  "temple.choice.returnToShip": "{{option}}. Return to the ship.",
  "temple.choice.enterLivingRoom":
    "{{option}}. Enter the doorway filled with light.",
  "temple.choice.inspectOldDoor": "{{option}}. Approach the door on the right.",
  "temple.returnToShip": "You head back to the ship.",
  "temple.enterLivingRoom":
    "You walk toward the light and step through the doorway.",
  "temple.inspectOldDoor":
    "You approach the door on the right. A strange cold seems to seep from it.\nA lock hangs on the door, its keyhole shaped like a triangle.",
  "temple.oldDoorLocked":
    "You try to open the door, but the lock will not budge.\nIf only you had a key...\nPerhaps you should search the other rooms.\nYou return to the centre of the hall.",
  "temple.oldDoorOpened":
    "Without hesitation, you take out the key you found earlier.\nThe lock yields with a creak, and you step inside.",

  "livingRoom.description":
    "Beyond the door is a tiny room that resembles a storage closet.\nA fireplace blazes on the left... Someone has clearly been here.\nAnd very recently...\nThere must be something interesting here...\n\nAvailable actions:",
  "livingRoom.choice.returnToTemple": "{{option}}. Return to the stone hall.",
  "livingRoom.choice.search": "{{option}}. Search the room.",
  "livingRoom.returnToTemple": "You head back...",
  "livingRoom.findKey":
    "You spend several—perhaps dozens of—minutes searching every corner of the room.\nThere is nothing interesting among the furniture and rags, except...\nSomething glints beside the fireplace, and you move closer.\nYou found some kind of key... but what does it open?",

  "dangerRoom.description":
    "The instant you enter, unease settles over you.\nYou want to flee as quickly as possible. Every instinct tells you to leave.\nThe room is almost completely dark, though a faint beam of light seems to shine in the distance...\n\nAvailable actions:",
  "dangerRoom.choice.returnToTemple": "{{option}}. Return to the stone hall.",
  "dangerRoom.choice.runToLight": "{{option}}. Run toward the light.",
  "dangerRoom.choice.searchDarkness":
    "{{option}}. Search the dark corners of the room.",
  "dangerRoom.returnToTemple": "You head back...",
  "dangerRoom.enterQuestRoom":
    "As you draw closer, you realise the light is coming through a door.\nThis dark hall makes your skin crawl. Without another thought, you step inside.",

  "questRoom.description":
    "This hall is surprisingly comfortable.\nIt is small, with a door ahead secured by a strange lock.\nSomething has been painted across the walls in silvery-red letters...\n\nAvailable actions:",
  "questRoom.choice.returnToDangerRoom":
    "{{option}}. Return to the frightening hall.",
  "questRoom.choice.inspectLock": "{{option}}. Approach the locked door.",
  "questRoom.returnToDangerRoom": "You head back.",
  "riddle.introduction":
    "At the door, you discover a combination lock.\nIt requires a ten-letter word. What could it be?\nYou study the writing on the walls and find...",
  "riddle.question":
    "A husband has me, and so does a beast; a lifeless stone and a cloud have me too.\nI do not look into the soul, yet I catch every change in appearance.\nA maiden sees me and straightens with pride.\nAn old man frowns; a child starts making faces.\nWhat am I? The final line is painted directly beneath the door.",
  "riddle.solved": "The door opens, and you step into the next room.",

  "otherShip.description":
    "Inside, you find a ruined hall with light pouring through the ceiling...\nThe opening above was torn by your commander's ship.\nThe vessel is embedded in the floor, wrecked beyond repair...\nYou look inside, but no one is there.\nThere is no time to investigate. You need to find its power module—if it survived.\n\nAvailable actions:",
  "otherShip.choice.returnToQuestRoom":
    "{{option}}. Return to the room with the riddle.",
  "otherShip.choice.inspectModule":
    "{{option}}. Inspect the ship's power module.",
  "otherShip.returnToQuestRoom": "You head back...",
  "otherShip.takeModule":
    "You approach the power module and are delighted to see its indicator showing a ten-percent charge. That should be enough to fly!\nThis ship is beyond saving, so you will have to return to your own.\nYou carefully remove the power module. It is time to head back.",

  "ending.death":
    "As you reach the darkest part of the hall, a tremor runs through your body.\nSomething is hiding in the abyss, and it seems to be moving toward you...\nYou try to run, but fear grips you so tightly that you can barely turn around.\nIt no longer matters. Some creature is rapidly closing in from behind...\nYou realise this is the end...\nYou should have trusted your instincts...",
  "ending.victory":
    "An unpleasant sensation...\nYour face shivers as cold drops strike your skin.\nYou open your eyes beneath the grey sky of your home city. The rain is steadily growing heavier.\nIt was all a dream... nothing more than a dream.\n‘Albert, there is no signal! Keep the coupling steady!’ someone shouts from your right.",

  "input.command": "> {{value}}",
  "system.restartAvailable": "The game is over. Enter restart to play again.",
  "error.invalidChoice": "Invalid choice. Available options: {{options}}.",
  "error.incorrectRiddleAnswer": "That is not the correct word. Try again.",
  "error.gameFinished":
    "The game is already over. Enter restart to play again.",
} satisfies TranslationDictionary;
