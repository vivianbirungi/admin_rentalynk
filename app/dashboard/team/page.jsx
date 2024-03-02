"use client";
import useRLStore from "../../lib/store";
import TimeAgo from "react-timeago";
import styles from "../../ui/dashboard/tenancies/tenancies.module.css";
import { useEffect } from "react";

const page = () => {
  const { team, getTeam } = useRLStore((state) => state);

  useEffect(() => {
    getTeam();
  }, []);

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
            <td>Last Login</td>
          </tr>
        </thead>
        <tbody>
          {team?.results?.map((user) => (
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <TimeAgo date={user.last_login} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
