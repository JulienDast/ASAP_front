import {Radio, Card, List, ListItem, ListItemPrefix, Typography} from "@material-tailwind/react";
import type { RadioProps } from "@material-tailwind/react";

type CustomRadioProps = RadioProps & {
  firstRadio: string,
  secondRadio: string,
  thirdRadio: string,
  fourthRadio: string,
  fifthRadio:string,
  onCategoryChange: (category: string) => void;
};

export function RadioHorizontalList({ firstRadio, secondRadio, thirdRadio, fourthRadio, fifthRadio, onCategoryChange }: CustomRadioProps) {
  return (
    <Card className="w-fit" 
      placeholder={undefined} 
      onPointerEnterCapture={undefined} 
      onPointerLeaveCapture={undefined}
    >
      <List className="flex flex-col sm:flex-row w-full" 
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
      >
        <div className="flex flex-row mx-auto">
          <ListItem className="p-0 w-fit" 
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
          >
            <label htmlFor={firstRadio} className="flex w-full cursor-pointer items-center px-3">
              <ListItemPrefix 
                className="mr-2" 
                placeholder={undefined} 
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
              >
                <Radio
                  name="horizontal-list"
                  color="yellow"
                  defaultChecked
                  id={firstRadio}
                  ripple={false}
                  className="hover:before:opacity-0 h-3 w-3"
                  containerProps={{
                    className: "p-0",
                  }}
                  onChange={() => onCategoryChange(firstRadio)} 
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined} 
                />
              </ListItemPrefix>
              <Typography 
                color="blue-gray" 
                className="font-medium text-sm text-blue-gray-400" 
                placeholder={undefined} 
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
              >
                {firstRadio}
              </Typography>
            </label>
          </ListItem>
          <ListItem 
            className="p-0 w-fit" 
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
          >
            <label 
              htmlFor={secondRadio} 
              className="flex w-full cursor-pointer items-center px-3"
            >
              <ListItemPrefix 
                className="mr-2" 
                placeholder={undefined} 
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
              >
                <Radio
                  name="horizontal-list"
                  id={secondRadio}
                  color="yellow"
                  ripple={false}
                  className="hover:before:opacity-0 h-3 w-3"
                  containerProps={{
                    className: "p-0",
                  }}
                  onChange={() => onCategoryChange(secondRadio)} 
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined} 
                  crossOrigin={undefined}          
                />
              </ListItemPrefix>
              <Typography 
                color="blue-gray" 
                className="font-medium text-sm text-blue-gray-400" 
                placeholder={undefined} 
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
              >
                {secondRadio}
              </Typography>
            </label>
          </ListItem>
          <ListItem 
            className="p-0 w-fit" 
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
          >
            <label 
              htmlFor={thirdRadio} 
              className="flex w-full cursor-pointer items-center px-3"
            >
              <ListItemPrefix 
                className="mr-2" 
                placeholder={undefined} 
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
              >
                <Radio
                  name="horizontal-list"
                  id={thirdRadio}
                  color="yellow"
                  ripple={false}
                  className="hover:before:opacity-0 h-3 w-3"
                  containerProps={{
                    className: "p-0",
                  }}
                  onChange={() => onCategoryChange(thirdRadio)} 
                  onPointerEnterCapture={undefined}
                   onPointerLeaveCapture={undefined}
                    crossOrigin={undefined}              
                />
              </ListItemPrefix>
              <Typography
                color="blue-gray" 
                className="font-medium text-sm text-blue-gray-400" 
                placeholder={undefined} 
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
              >
                {thirdRadio}
              </Typography>
            </label>
          </ListItem>
        </div>
        <div className="flex flex-row mx-auto">
          <ListItem 
            className="p-0 w-fit" 
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
          >
            <label 
              htmlFor={fourthRadio} 
              className="flex w-full cursor-pointer items-center px-3"
            >
              <ListItemPrefix 
                className="mr-2" 
                placeholder={undefined} 
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
              >
                <Radio
                  name="horizontal-list"
                  id={fourthRadio}
                  color="yellow"
                  ripple={false}
                  className="hover:before:opacity-0 h-3 w-3"
                  containerProps={{
                    className: "p-0",
                  }}
                  onChange={() => onCategoryChange(fourthRadio)} 
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined} 
                  crossOrigin={undefined}                
                />
              </ListItemPrefix>
              <Typography 
                color="blue-gray" 
                className="font-medium text-sm text-blue-gray-400" 
                placeholder={undefined} 
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
              >
                {fourthRadio}
              </Typography>
            </label>
          </ListItem>
          <ListItem 
            className="p-0 w-fit"  
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
          >
            <label 
              htmlFor={fifthRadio} 
              className="flex w-full cursor-pointer items-center px-3"
            >
              <ListItemPrefix 
                className="mr-2" 
                placeholder={undefined} 
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
              >
                <Radio
                  name="horizontal-list"
                  id={fifthRadio}
                  color="yellow"
                  ripple={false}
                  className="hover:before:opacity-0 h-3 w-3"
                  containerProps={{
                    className: "p-0",
                  }}
                  onChange={() => onCategoryChange(fifthRadio)} 
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined} 
                  crossOrigin={undefined}              
                />
              </ListItemPrefix>
              <Typography 
                color="blue-gray" 
                className="font-medium text-sm text-blue-gray-400" 
                placeholder={undefined} 
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
              >
                {fifthRadio}
              </Typography>
            </label>
          </ListItem>
        </div>
      </List>
    </Card>
  );
}