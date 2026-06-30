"use client";

import { NavigationMenu } from "radix-ui";
import classNames from "classnames";
import { CaretDownIcon } from "@radix-ui/react-icons";
import styles from "./style.module.css";
import { Ref, useRef } from "react";

export type NavigationProps = {
  title: string;
  href?: string;
  children?: NavigationProps[];
};

export type GlobalNavigationProps = {
  data: NavigationProps[];
};

export const GlobalNavigation = ({ data }: GlobalNavigationProps) => {
  console.log(data);
  const navRef = useRef(null);
  const nav = (
    <NavigationMenu.Root className={styles.Root} data-radius="medium">
      <NavigationMenu.List className={styles.MenuList}>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            className={styles.Link}
            href="https://github.com/ryanwild/wildman-stack"
            target="_blank"
          >
            Github
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className={styles.Trigger}>
            Account
            <CaretDownIcon className={styles.CaretDown} aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className={styles.Content}>
            <ul className={`${styles.List}`}>
              <ListItem href="/login" title="Log in" ref={navRef}>
                Access your account dashboard
              </ListItem>
              <ListItem href="/signup" title="Sign Up" ref={navRef}>
                Get started, create an account.
              </ListItem>
              <ListItem href="/logout" title="Log out" ref={navRef}>
                Sign out of this device.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className={styles.Indicator}>
          <div className={styles.Arrow} />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className={styles.ViewportPosition}>
        <NavigationMenu.Viewport className={styles.Viewport} />
      </div>
    </NavigationMenu.Root>
  );
  return nav;
};

type ListItemProps = {
  href: string;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  ref?: Ref<HTMLAnchorElement>;
};

const ListItem = ({
  className,
  children,
  title,
  ref,
  ...props
}: ListItemProps) => {
  return (
    <li>
      <NavigationMenu.Link asChild>
        <a
          ref={ref}
          className={classNames(styles.ListItemLink, className)}
          {...props}
        >
          <div className={styles.ListItemHeading}>{title}</div>
          <p className={styles.ListItemText}>{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  );
};

export default GlobalNavigation;
