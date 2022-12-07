interface File {
  name: string;
  size: number;
}

export interface Dir {
  name: string;
  parent?: Dir;
  subDirs: Dir[];
  files: File[];
}

export function loadDirs(i: string[]): Dir[] {
  const rootDir = {
    name: "root",
    parent: undefined,
    subDirs: [],
    files: [],
  };
  const dirs: Dir[] = [rootDir];
  let currentDir: Dir = rootDir;

  i.forEach((line, index) => {
    if (index === 0) return;

    // CD command
    if (line.startsWith("$")) {
      const [command, folder] = line.substring(2).split(" ");
      if (command !== "cd") return;

      if (folder === "..") {
        currentDir = currentDir.parent!;
        return;
      }

      currentDir = {
        name: folder,
        files: [],
        subDirs: [],
        parent: currentDir,
      };
      dirs.push(currentDir);
      currentDir.parent!.subDirs.push(currentDir);

      return;
    }

    // Add listed files / subdirectories to currentDir.files / .subdirs
    const [fileSize, fileName] = line.split(" ");
    if (line.startsWith("dir")) return;

    currentDir.files.push({
      size: Number(fileSize),
      name: fileName,
    });
  });

  return dirs;
}

export function getSize(dir: Dir): number {
  let size = 0;

  dir.files.forEach((file) => {
    size += file.size;
  });

  dir.subDirs.forEach((d) => {
    size += getSize(d);
  });

  return size;
}
