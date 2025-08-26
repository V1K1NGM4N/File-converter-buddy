interface AnimatedFileTypeProps {
  fileType: 'images' | 'videos' | 'files';
}

export const AnimatedFileType = ({ fileType }: AnimatedFileTypeProps) => {
  return (
    <span className="inline-block min-w-[4rem] text-center">
      {fileType}
    </span>
  );
};